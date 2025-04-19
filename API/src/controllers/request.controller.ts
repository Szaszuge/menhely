const requestService = require("../services/request.service");
export const getAllRequests = async (req, res) => {
    const requests = await requestService.getAll();
    return res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}
export const getAllRequestsRaw = async (req, res) => {
    const requests = await requestService.getAllRaw();
    return res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}
export const acceptRequest = async (req, res) => {
    const id = req.body.id;
    console.log(`Accepting request... [${id}]`);
    await requestService.acceptRequest(id);
    return res.status(200).json({ message: "Sikeres fogadás"});
}
export const refuseRequest = async (req, res) => {
    const id = req.body.id;
    console.log(`Refusing request... [${id}]`);
    const answer = await requestService.refuseRequest(id);
    if (answer) return res.status(200).json({ message: "Sikeres elutasítás"});
    return res.status(203).json({ message: "Sikertelen elutasítás"});
}