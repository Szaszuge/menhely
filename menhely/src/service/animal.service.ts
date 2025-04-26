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
    updateAnimal(data:FormData) {
        return axios.post(this.server + "/animal/update", data, {headers: {"Content-Type": "multipart/form-data"}})
    }
    togglePublicStatus(id:string){
        console.log("Send request.")
        return axios.post(this.server + "/animal/publify", [id])
    }
    deleteAnimalByID(id:string){
        return axios.post(this.server + "/animal/delete", [id])
    }
}