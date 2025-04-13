import { AppDataSource } from "../data-source";
import { Request } from "../entity/Requests";
import { RequestView } from "../entity/view/request.view";
exports.getAllRaw = async () => {
    console.log(`[SERVICE] GATHERING ALL REQUESTS RAW...`)
    const requests = await AppDataSource.manager.find(Request);
    return requests;
}
exports.getAll = async () => {
    console.log(`[SERVICE] GATHERING ALL REQUESTS...`)
    const requests = await AppDataSource.manager.find(RequestView);
    return requests;
}