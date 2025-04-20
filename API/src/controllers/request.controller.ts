const requestService = require("../services/request.service");
export const getAllRequests = async (req, res) => {
    const requests = await requestService.getAll();
    return res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}
export const getAllRequestsRaw = async (req, res) => {
    const requests = await requestService.getAllRaw();
    return res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
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
        res.status(203).json({message: "Valami történt"});
    }
    next();
}
export const deleteRequest = async (req, res) => {
    console.log(`Deleting request... [${req.body.id}]`);
    const answer = await requestService.deleteRequest(req.body.id);
    if (answer) return res.status(200).json({ message: "Sikeres törlés"});
    return res.status(203).json({ message: "Sikertelen törlés"});
}