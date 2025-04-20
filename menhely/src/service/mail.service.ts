import axios from 'axios';
import { environment } from '../enviroments/testing';

export class MailService {
    constructor(){ }
        private server = environment.serverUrl;
    sendMail(data:any){
        console.log("Sending mail...");
        return axios.post(this.server + "/mails/render", data);
    }
    
}