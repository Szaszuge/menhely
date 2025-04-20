const requestService = require("../services/request.service");
export const getAllRequests = async (req, res) => {
    const requests = await requestService.getAll();
    return res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}
export const getAllRequestsRaw = async (req, res) => {
    const requests = await requestService.getAllRaw();
    return res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}
export const acceptRequest = async (req, res, next) => {
    const id = req.body.id;
    console.log(`Accepting request... [${id}]`);
    await requestService.acceptRequest(id);
    next();
}
export const deleteRequest = async (req, res) => {
    console.log(`Deleting request... [${req.body.id}]`);
    const answer = await requestService.deleteRequest(req.body.id);
    if (answer) return res.status(200).json({ message: "Sikeres törlés"});
    return res.status(203).json({ message: "Sikertelen törlés"});
}