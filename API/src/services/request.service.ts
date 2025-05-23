    import { describe } from "node:test";
import { AppDataSource } from "../data-source";
import { Animal, Kind, From, Gender } from "../entity/Animal";
import { User } from "../entity/User";
import { Request, RequestType } from "../entity/Requests";
import { RequestView } from "../entity/view/request.view";
import { Activity, ActivityType } from "../entity/Activity";
import { ActivityView } from "../entity/view/activity.view";
exports.getAllRaw = async () => {
    console.log(`[SERVICE] GATHERING ALL REQUESTS RAW...`)
    const requests = await AppDataSource.manager.find(Request);
    return requests;
}
exports.getAll = async () => {
    const requests = await AppDataSource.manager.find(RequestView);
    return requests;
}
exports.getByID = async (id) => {
    console.log(`[SERVICE] GATHERING REQUEST BY ID...`)
    const request = await AppDataSource.manager.findOneBy(Request, {id: id})
    if (!request){
        return null;
    }
    return request;
}

exports.getActivities = async () => {
    const activities = await AppDataSource.manager.find(ActivityView)
    return activities;
}

exports.reserveVolunteer = async (data) => {
    const request_date = `${data.details.date.year}-${data.details.date.month}-${data.details.date.day}T00:00:00.000`;
    const request_date_plus = `${data.details.date.year}-${data.details.date.month}-${data.details.date.day + 1}T00:00:00.000`;
    const pushed_volunteer_request = new Request();
    const user = await AppDataSource.manager.findOneBy(User, { id: data.user })
    pushed_volunteer_request.user = user;
    pushed_volunteer_request.Type = RequestType.work;

    pushed_volunteer_request.details = data.details;

    const answer = await AppDataSource.manager.query(`SELECT * FROM activity WHERE type = 'Önkéntes munka' AND date >= '${request_date}' AND date < '${request_date_plus}'`);
    if (answer.length > 1) {
        return false;
    }
    AppDataSource.manager.save(Request, pushed_volunteer_request);
    return true;
};

exports.reserveVisit = async (data) => {
    const pushed_visit_request = new Request();
    const user = await AppDataSource.manager.findOneBy(User, { id: data.user })
    pushed_visit_request.user = user;
    pushed_visit_request.Type = RequestType.check;

    pushed_visit_request.details = data.details;

    const volunteer_request = AppDataSource.manager.save(Request, pushed_visit_request);
    
    if (!!volunteer_request){
        return true;
    }

    return false;
};

exports.reserveAdoption = async (data) => {
    const pushed_adoption_request = new Request();
    const user = await AppDataSource.manager.findOneBy(User, { id: data.user })
    pushed_adoption_request.user = user;
    pushed_adoption_request.Type = RequestType.adopt;

    pushed_adoption_request.details = data.details;

    const volunteer_request = AppDataSource.manager.save(Request, pushed_adoption_request);
    
    if (!!volunteer_request){
        return true;
    }

    return false;
};
exports.acceptRequest = async (id) => {
    console.log(`[SERVICE] ACCEPTING REQUEST...`)
    const request = await AppDataSource.manager.findOneBy(RequestView, {id: id})
    if (!request){
        console.log(`[SERVICE] REQUEST NON-EXISTANT. RETURNING...`)
        return "non-existent";
    }
    console.log(id);
    console.log(request);
    switch (request.type){
        case "Leadás":
            console.log(`[SERVICE] REQUEST TYPE: SURRENDER`)
            let animal = new Animal();
            animal.name = !!request.details.name ? request.details.name : "Névtelen";
            animal.from = request.details.from == "home" ? From.home : From.found;
            animal.type = request.details.type == "dog" ? Kind.dog : Kind.cat;
            animal.gender = Gender.unknown;
            animal.age = null;
            animal.isPublic = false;

            // Elfogadás dátumának formázása (Lehet függvény kéne)
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            const ma = yyyy + '-' + mm + '-' + dd;

            animal.arrival = ma;

            const details = {
                description: request.details.other,
                image: request.details.image,
                city: request.details.city,
            };
            animal.details = details;

            const uploaded_animal = await AppDataSource.manager.save(animal);
            console.log(`[SERVICE] SAVED ANIMAL`)
            break;
        case "Önkéntes munka":
            console.log(`[SERVICE] REQUEST TYPE: WORK`)
            console.log(request);
            let work = new Activity()
            work.user = await AppDataSource.manager.findOneBy(User, {email: request.targetEmail});
            work.type = ActivityType.work;
            work.date = new Date(`${request.details.date.year}-${request.details.date.month}-${request.details.date.day} ${request.details.fromTo[0]}`);
            work.secondaryTime = request.details.fromTo[1];
            const saved_work = await AppDataSource.manager.save(work);
            break;
        case "Látogatás":
            console.log(`[SERVICE] REQUEST TYPE: VISIT`)
            console.log(request);
            let visit = new Activity()
            visit.user = await AppDataSource.manager.findOneBy(User, {email: request.targetEmail});
            visit.type = ActivityType.check;
            visit.date = new Date(`${request.details.date} ${request.details.time}`)
            visit.animal = request.details.animal;
            const saved_visit = await AppDataSource.manager.save(visit);
            break;
        case "Örökbefogadás":
            console.log(`[SERVICE] REQUEST TYPE: VISIT`)
            console.log(request);
            let adopt = new Activity()
            adopt.user = await AppDataSource.manager.findOneBy(User, {email: request.targetEmail});
            adopt.type = ActivityType.adopt;
            adopt.date = new Date(`${request.details.date} ${request.details.time}`)
            adopt.animal = request.details.animal;
            const saved_adopt = await AppDataSource.manager.save(adopt);
            break;

        default:
            return "non-handled";
    }
    return true;

}
exports.deleteRequest = async (id) => {
    console.log(`[SERVICE] DELETING REQUEST...`)
    const request = await AppDataSource.manager.findOneBy(Request, {id: id})
    if (!request){
        console.log(`[SERVICE] REQUEST NON-EXISTANT. RETURNING...`)
        return false;
    }
    await AppDataSource.manager.delete(Request, {id: request.id});
    return true;
}