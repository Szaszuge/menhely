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
    
    loggedUser(){
        const token = localStorage.getItem(this.tokenName);
        if (token){
          const payload = token.split('.')[1];
          const decodedPayload = atob(payload);
          const decodedUTF8Payload = new TextDecoder('utf-8').decode(
            new Uint8Array(decodedPayload.split('').map(char => char.charCodeAt(0)))
          );
          return JSON.parse(decodedUTF8Payload);
        }
        return null;
      }
}