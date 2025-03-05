import axios from 'axios';
import { environment } from '../enviroments/testing';
import type { User } from '@/interfaces/user';
import type { Address } from '@/interfaces/address';

export class MailService {
    constructor(){ }
        private server = environment.serverUrl;
        private tokenName = environment.tokenName;

    sendMail(data:any){
        console.log("Sending mail...");
        return axios.post(this.server + "/mails/render", data);
    }
    
}