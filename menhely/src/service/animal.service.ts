import axios from 'axios';
import { environment } from '../enviroments/testing';

export class AnimalService {
    constructor(){}
        private server = environment.serverUrl;

    requestSurrender(data:FormData){
        console.log("Send request for animal surrender.")
        return axios.post("http://localhost:3000/api/animal/add", data, {headers: {"Content-Type": "multipart/form-data"}})
    }
}