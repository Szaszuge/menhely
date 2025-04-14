const requestService = require("../services/request.service");
export const getAllRequests = async (req, res) => {
    const requests = await requestService.getAll();
    res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}
export const getAllRequestsRaw = async (req, res) => {
    const requests = await requestService.getAllRaw();
    res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}
export const acceptRequest = async (req, res) => {
    const id = req.body.id;
    console.log(`Accepting request... [${id}]`);
    const request = await requestService.acceptRequest(id);
    res.status(200).json({ message: "Sikeres fogadás", request: request });
}