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
    pushed_animal_request.details.image = filename;
    
    console.log(`[SERVICE] PUSHING GENERATED REQUEST INSTANCE...`)

    const animal_request = AppDataSource.manager.save(Request, pushed_animal_request);
    
    return animal_request;
}
exports.getAllAnimals = async() => {
    console.log(`[SERVICE] GETTING ALL ANIMALS...`)
    const animals = await AppDataSource.manager.find(AnimalView);
    return animals;
}