import { Animal, From, Gender, Kind } from "../entity/Animal";
import { AppDataSource } from "../data-source";
import { Request, RequestType } from "../entity/Requests";
import { User } from "../entity/User";
import { AnimalView } from "../entity/view/animal.view";

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

exports.getByID = async(id:string) => {
    return await AppDataSource.manager.findOneBy(Animal, {id: id});
}
exports.getAllAnimals = async() => {
    return await AppDataSource.manager.find(AnimalView);
}