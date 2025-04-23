import { Animal } from "../entity/Animal";
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
    pushed_animal_request.details.image = filename ? filename : null ;
    
    console.log(`[SERVICE] PUSHING GENERATED REQUEST INSTANCE...`)
    
    return AppDataSource.manager.save(Request, pushed_animal_request);
}
exports.getByID = async(id:string) => {
    return await AppDataSource.manager.findOneBy(Animal, {id: id});
}
exports.getAllAnimals = async() => {
    return await AppDataSource.manager.find(AnimalView);
}