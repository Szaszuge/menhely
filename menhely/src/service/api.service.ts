import axios from 'axios';
import { environment } from '../enviroments/testing';
import type { User } from '../interfaces/user';
import type { Address } from '../interfaces/address';

export class ApiService {
    constructor(){ }
        private server:string = environment.serverUrl;

    userRegister(user:User, address:Address){
        //console.log("Reservation request called.");
        return axios.post(this.server + "/users/reserve", [user, address]);
    }
    userDataByID(id:number){
        //console.log("User Status request called.");
        return axios.post(this.server + "/users/getStatByID", [id]);
    }
    userActivate(id:number, confirm:string){
        //console.log("Attempting to activate.");
        return axios.post(this.server + "/users/activateByID", [id, confirm]);
    }
    userLogin(name:string, pass:string){
        //console.log("Attempting to log user in.");
        return axios.post(this.server + "/users/login", [name, pass]);
    }
    userPassRecover(email:string){
        return axios.post(this.server + "/users/recover", [email])
    }
    resetPassByID(id:string, pass:string, confirm:string){
        return axios.post(this.server + "/users/resetPass", [id, pass, confirm])
    }
    revertPassword(id:string){
        return axios.post(this.server + "/users/revertPass", [id])
    }

    submitVolunteerRequest(data){
        return axios.post(this.server + "/requests/volunteer", data)
    }

    getMailDataByMail(email:string){
        return axios.post(this.server + "/users/mailData", [email])
    }

    RequestByID(id:string){
        //console.log("Fetching all requests.");
        return axios.post(this.server + "/requests/getByID", [id]);
    }
    getAllRequests(){
        //console.log("Fetching all requests.");
        return axios.get(this.server + "/requests/getAll");
    }
    getAllRequestsRaw(){
        //console.log("Fetching all requests.");
        return axios.get(this.server + "/requests/getAllRaw");
    }
    getAllUsers(){
        //console.log("Fetching all users.");
        return axios.get(this.server + "/users/getAll");
    }
    getAllAnimals(){
        //console.log("Fetching all animals.");
        return axios.get(this.server + "/animal/getAll");
    }

    PromoteUser(id:string){
        return axios.post(this.server + "/users/promote", [id]);
    }
    DemoteUser(id:string){
        return axios.post(this.server + "/users/demote", [id]);
    }

    acceptRequest(id:string, mail:any){
        return axios.post(this.server + "/requests/accept", [id, mail]);
    }
    refuseRequest(id:string, mail:any){
        return axios.post(this.server + "/requests/refuse", [id, mail])
    }
}