import { Animal, From, Gender, Kind } from "../entity/Animal";
import { AppDataSource } from "../data-source";
import { Request, RequestType } from "../entity/Requests";
import { User } from "../entity/User";
import { AnimalView } from "../entity/view/animal.view";
import { Activity } from "../entity/Activity";
import { JsonContains } from 'typeorm';


exports.reserveAnimalSurrenderRequest = async(data, filename) => {
    console.log(`[SERVICE] ANIMAL SURRENDER REQUEST... ${data.user}`)
    const pushed_animal_request = new Request();

    const user = await AppDataSource.manager.findOneBy(User, { id: data.user })
    pushed_animal_request.user = user;
    pushed_animal_request.Type = RequestType.surrender;

    pushed_animal_request.details = data.details;
    pushed_animal_request.details.image = filename ?? null ;
    
    console.log(`[SERVICE] PUSHING GENERATED REQUEST INSTANCE...`)
    
    return AppDataSource.manager.save(Request, pushed_animal_request);
}
exports.updateAnimal = async(data, filename, allGood) => {
    const pushed_animal = new Animal();

    pushed_animal.name = data.name;
    pushed_animal.type = data.type == 'dog' ? Kind.dog : Kind.cat;
    pushed_animal.age = data.age;
    pushed_animal.gender = data.gender == 'male' ? Gender.male : (data.gender == 'female' ? Gender.female : Gender.unknown);
    pushed_animal.from = data.from == 'home' ? From.home : From.found;
    pushed_animal.details = data.details;
    console.log(`[SERVICE] IS THE ANIMAL PUBLISHABLE: ${allGood ? 'YES' : 'NO'}`);
    console.log(pushed_animal.details)

    const result = await AppDataSource.manager.findOneBy(Animal, {id: data.id});
    if (result != null) {
        if (result.isPublic){
            return false;
        }
        pushed_animal.details.image = filename ?? result.details.image;
        await AppDataSource
        .createQueryBuilder()
        .update(Animal)
        .set({name: pushed_animal.name, age: pushed_animal.age, type: pushed_animal.type, from: pushed_animal.from, gender: pushed_animal.gender, details: pushed_animal.details, isPublicable: allGood})
        .where("id = :id", {id: data.id})
        .execute();
        return true;
    }
    return false;
}
exports.togglePublicity = async(id:string) => {
    const result = await AppDataSource.manager.findOneBy(Animal, {id: id});
    return await AppDataSource
    .createQueryBuilder()
    .update(Animal)
    .set({ isPublic: !result.isPublic})
    .where("id = :id", {id: id})
    .execute();
}
exports.getByID = async(id:string) => {
    return await AppDataSource.manager.findOneBy(Animal, {id: id});
}
exports.getAllAnimals = async() => {
    return await AppDataSource.manager.find(AnimalView);
}
exports.getAllAnimalsRaw = async() => {
    return await AppDataSource.getRepository(Animal).createQueryBuilder("animal").where("animal.isPublic = 1").getMany();
}
exports.getHomePets = async() => {
    return await AppDataSource.getRepository(Animal).createQueryBuilder("pet").orderBy("pet.created_at", "DESC").limit(6).getMany();
}

exports.deleteByID = async(id:string) => {
    const answer = await AppDataSource.manager.delete(Animal, {id: id});
    if (answer.affected > 0){
        return true;
    }
    return false;
}
exports.isAdoptable = async(id:string) => {
    const helper:Animal = await AppDataSource.manager.findOneBy(Animal, {id: id})
    const answer = await AppDataSource.manager.query(`SELECT * FROM activity WHERE type = 'Örökbefogadás' AND animalId = '${helper.id}'`);
    console.log(answer);
    if (answer.length == 0) {
        return true;
    }
    return false;
}
