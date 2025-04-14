import { describe } from "node:test";
import { AppDataSource } from "../data-source";
import { Animal, Kind, From, Gender } from "../entity/Animal";
import { Request } from "../entity/Requests";
import { RequestView } from "../entity/view/request.view";
exports.getAllRaw = async () => {
    console.log(`[SERVICE] GATHERING ALL REQUESTS RAW...`)
    const requests = await AppDataSource.manager.find(Request);
    return requests;
}
exports.getAll = async () => {
    const requests = await AppDataSource.manager.find(RequestView);
    return requests;
}
exports.acceptRequest = async (id) => {
    console.log(`[SERVICE] ACCEPTING REQUEST...`)
    const request = await AppDataSource.manager.findOneBy(Request, {id: id})
    if (!request){
        console.log(`[SERVICE] REQUEST NON-EXISTANT. RETURNING...`)
        return "non-existent";
    }
    switch (request.Type){
        case "Leadás":
            console.log(`[SERVICE] REQUEST TYPE: SURRENDER`)
            let animal = new Animal();
            animal.name = !!request.details.name ? request.details.name : "Névtelen";
            animal.from = request.details.from == "home" ? From.home : From.found;
            animal.type = request.details.type == "dog" ? Kind.dog : Kind.cat;
            animal.gender = Gender.unknown;
            animal.age = null;

            // Elfogadás dátumának formázása (Lehet függvény kéne)
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            const ma = yyyy + '-' + mm + '-' + dd;

            animal.arrival = ma;

            let details = {
                description: request.details.other,
                image: request.details.image,
                city: request.details.city,
            };
            animal.details = details;
            const uploaded_animal = await AppDataSource.manager.save(animal);
            console.log(`[SERVICE] SAVED ANIMAL`)
            break;
        default:
            return "non-handled";
    }
    const deleted_request = await AppDataSource.manager.delete(Request, {id: request.id});
    console.log(deleted_request.affected)
    return deleted_request;

}