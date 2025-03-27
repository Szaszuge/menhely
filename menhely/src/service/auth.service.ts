import axios from 'axios';
import { environment } from '../enviroments/testing';

export class AuthService {
    constructor(){ }    
        private tokenName = environment.tokenName;

    private hasToken():boolean{
        return !!localStorage.getItem(this.tokenName);
    }

    getToken():String | null{
        return localStorage.getItem(this.tokenName);
    }
    
}