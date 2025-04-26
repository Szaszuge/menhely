import axios from 'axios';
import { environment } from '../enviroments/testing';
export class RequestService {
    constructor(){ }
        private server:string = environment.serverUrl;

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

        acceptRequest(id:string, mail:any){
            return axios.post(this.server + "/requests/accept", [id, mail]);
        }
        refuseRequest(id:string, mail:any){
            return axios.post(this.server + "/requests/refuse", [id, mail])
        }

        requestVisit(data:any){
            return axios.post(this.server + "/requests/visit", data);
        }
}