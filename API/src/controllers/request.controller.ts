const requestService = require("../services/request.service");
export const getAllRequests = async (req, res) => {
    console.log("Fetching all requests...");
    const requests = await requestService.getAll();
    res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}
export const getAllRequestsRaw = async (req, res) => {
    console.log("Fetching all requests raw...");
    const requests = await requestService.getAllRaw();
    res.status(200).json({ message: "Sikeres lekérdezés", requests: requests });
}