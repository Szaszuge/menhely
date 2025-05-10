const requestService = require("../services/request.service");
export const getAllRequests = async (req, res) => {
    const requests = await requestService.getAll();
    return res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}
export const getAllRequestsRaw = async (req, res) => {
    const requests = await requestService.getAllRaw();
    return res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}
export const getActivities = async (req, res) => {
    const requests = await requestService.getActivities();
    return res.status(200).json({ message: "Sikeres lekérdezés", activities: requests });
}
export const getByID = async (req, res) => {
    console.log(req.body[0]);
    const found = await requestService.getByID(req.body[0]);
    if (!found){
        return res.status(203).json({ message: "Nem találtunk kérelmet.", request: null})
    }
    return res.status(200).json({ message: "Kérelem lekérve", request: found});
}
export const acceptRequest = async (req, res, next) => {
    const id = req.body.id;
    console.log(`Accepting request... [${id}]`);
    const answer = await requestService.acceptRequest(id);
    if (!answer) {
        return res.status(203).json({message: "Valami történt"});
    }
    next();
}
export const deleteRequest = async (req, res) => {
    console.log(`Deleting request... [${req.body[0]}]`);
    const answer = await requestService.deleteRequest(req.body[0]);
    if (answer) return res.status(200).json({ message: "Sikeres törlés"});
    return res.status(203).json({ message: "Sikertelen törlés"});
}

export const volunteer = async (req, res) => {
    let request = req.body;
    const rawTime = [req.body.details.fromTo[0], req.body.details.fromTo[1]];

    const computedTime = [formatTimeFromPercent(rawTime[0]), formatTimeFromPercent(rawTime[1])];
    request.details.fromTo = computedTime;

    if (request.type != 'volunteer'){
        return res.status(203).json({ message: 'Hibás vagy helytelen kérelem tipus!'});
    }
    if (!request.user || !request.details.date || !request.details.fromTo || !request.details.reason){
        return res.status(203).json({ message: 'Hiányzó adatok!'});
    }
    const request_date = new Date(`${request.details.date.year}-${request.details.date.month}-${request.details.date.day}`);
    const current_date = new Date();
    
        if (request_date < current_date){
            return res.status(203).json({ message: 'A dátum a múltban van!'});
        }
        current_date.setDate(current_date.getDate() + 7)
    
    if (request_date < current_date){
        return res.status(203).json({ message: 'Nincs idő a feldolgozásra! (A jelentkezés és a munka napja közt legyen legalább 7 nap legyen!)'});
    }
    // TODO: Van-e már két önkéntes azon a napon: Dobja vissza.

    console.log(request);
    const answer = requestService.reserveVolunteer(request);

    if (!answer) {
        return res.status(203).json({message: "Hiba történt a mentéskor!"});
    }

    return res.status(200).json({message: "Kérelem továbbítva!"});
}

export const visit = async (req, res) => {
    let request = req.body;

    if (request.type != 'visit'){
        return res.status(203).json({ message: 'Hibás vagy helytelen kérelem tipus!'});
    }
    if (!request.user || !request.details.date || !request.details.time || !request.details.animal){
        return res.status(203).json({ message: 'Hiányzó adatok!'});
    }
    const request_date = new Date(request.details.date);
    const current_date = new Date();
    
        if (request_date < current_date){
            return res.status(203).json({ message: 'A dátum a múltban van!'});
        }
        current_date.setDate(current_date.getDate() + 7)
    
    if (request_date < current_date){
        return res.status(203).json({ message: 'Nincs idő a feldolgozásra! (A jelentkezés és a látogatás napja közt legyen legalább 7 nap legyen!)'});
    }
    // TODO: már két ember látogatja az állatot  azon a napon: Dobja vissza.
    // TODO: Az időpont (óra:perc) az foglalt: Dobja vissza.

    console.log(request);
    const answer = requestService.reserveVisit(request);

    if (!answer) {
        return res.status(203).json({message: "Hiba történt a mentéskor!"});
    }
    return res.status(203).json({message: "Kérelem továbbítva!"});
}

export const adopt = async (req, res) => {
    let request = req.body;

    if (request.type != 'adoption'){
        return res.status(203).json({ message: 'Hibás vagy helytelen kérelem tipus!'});
    }
    if (!request.user || !request.details.date || !request.details.time || !request.details.animal){
        return res.status(203).json({ message: 'Hiányzó adatok!'});
    }
    const request_date = new Date(request.details.date);
    const current_date = new Date();
    
        if (request_date < current_date){
            return res.status(203).json({ message: 'A dátum a múltban van!'});
        }
        current_date.setDate(current_date.getDate() + 7)
    
    if (request_date < current_date){
        return res.status(203).json({ message: 'Nincs idő a feldolgozásra! (A jelentkezés és az örökbefogadás napja közt legyen legalább 7 nap legyen!)'});
    }
    // TODO: Az időpont (óra:perc) az foglalt: Dobja vissza.

    console.log(request);
    const answer = requestService.reserveAdoption(request);

    if (!answer) {
        return res.status(203).json({message: "Hiba történt a mentéskor!"});
    }
    return res.status(203).json({message: "Kérelem továbbítva!"});
}

const TOTAL_MINUTES = 12 * 60; 
const START_HOUR = 8;

function formatTimeFromPercent(percent: number): string {
    const minutesSinceMidnight = Math.round(START_HOUR * 60 + (percent / 100) * TOTAL_MINUTES);
    
    // Round to nearest 15 minutes
    const roundedMinutes = Math.round(minutesSinceMidnight / 15) * 15;
    
    const hours = Math.floor(roundedMinutes / 60);
    const minutes = roundedMinutes % 60;
    
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }