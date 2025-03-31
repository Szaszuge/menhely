import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
export const useUserStore = defineStore('counter', () => {
    const token = ref(localStorage.getItem("token") ?? "");
    
    function setToken(tokenParam){
        localStorage.setItem("token", tokenParam);
        token.value = tokenParam;
    }

    function isLoggedIn(){
        return token.value.length != 0;
    }
    function loggedUser(){
      const tokenString = localStorage.getItem("token");
      if (tokenString){
        const payload = tokenString.split('.')[1];
        const decodedPayload = atob(payload);
        const decodedUTF8Payload = new TextDecoder('utf-8').decode(
          new Uint8Array(decodedPayload.split('').map(char => char.charCodeAt(0)))
        );
        return JSON.parse(decodedUTF8Payload);
      }
      return null;
    }
    
    return { token, setToken, isLoggedIn, loggedUser }
  })