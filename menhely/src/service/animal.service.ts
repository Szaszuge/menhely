import axios from 'axios';
import { environment } from '../enviroments/testing';

export class AnimalService {
    constructor(){}
        private server:string = environment.serverUrl;

    requestSurrender(data:FormData) {
        console.log("Send request for animal surrender.")
        return axios.post(this.server + "/animal/add", data, {headers: {"Content-Type": "multipart/form-data"}})
    }
    GetAnimalDataByID(id:string) {
        return axios.post(this.server + "/animal/getByID", [id])
    }
}