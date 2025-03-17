import axios from 'axios';
import { environment } from '../enviroments/testing';
import type { User } from '@/interfaces/user';
import type { Address } from '@/interfaces/address';

export class ApiService {
    constructor(){ }
        private server = environment.serverUrl;
        private tokenName = environment.tokenName;

    getToken():String | null{
        return localStorage.getItem(this.tokenName);
    }

    userRegister(user:User, address:Address){
        console.log("Reservation request called.");
        return axios.post(this.server + "/users/reserve", [user, address]);
    }
    userDataByID(id:number){
        console.log("User Status request called.");
        return axios.post(this.server + "/users/getStatByID", [id]);
    }
    userActivate(id:number, confirm:String){
        console.log("Attempting to activate.");
        return axios.post(this.server + "/users/activateByID", [id, confirm]);
    }
    
}