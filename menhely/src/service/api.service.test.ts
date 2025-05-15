import { expect, test } from 'vitest'
import { ApiService } from './api.service'
import { User } from '../interfaces/user';
import { Address } from '../interfaces/address';

const api = new ApiService();
let userid = null

test('User register attempt (Empty data)', () => {
    const user:User = {
        userName: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
    };
    const address:Address = {
        city: "",
        postal: "",
        street: "",
        number: "",
        floor: null,
        door: null
    };
    api.userRegister(user, address).then((res) => {
        expect(res.data.message).toEqual('Hiányzó adatok!');
    });
})
test('User register attempt (Invalid Username)', () => {
    const user:User = {
        userName: "é",
        fullName: "Gipsz Jakab",
        email: "gipsz.jakab@gmail.com",
        phoneNumber: "06301231234",
        password: "GipszJakab123",
    };
    const address:Address = {
        city: "Baja",
        postal: "6500",
        street: "József Tér",
        number: "6",
        floor: null,
        door: null
    };
    api.userRegister(user, address).then((res) => {
        expect(res.data.message).toEqual('Helytelen felhasználónév!');
    });
})
test('User register attempt (Invalid full name)', () => {
    const user:User = {
        userName: "GJakab12",
        fullName: "GipszJakab",
        email: "gipsz.jakab@gmail.com",
        phoneNumber: "06301231234",
        password: "GipszJakab123",
    };
    const address:Address = {
        city: "Baja",
        postal: "6500",
        street: "József Tér",
        number: "6",
        floor: null,
        door: null
    };
    api.userRegister(user, address).then((res) => {
        expect(res.data.message).toEqual('Helytelen név formátum!');
    });
})
test('User register attempt (Invalid e-mail address)', () => {
    const user:User = {
        userName: "GJakab12",
        fullName: "Gipsz Jakab",
        email: "gipsz.jakab.gmail.com",
        phoneNumber: "06301231234",
        password: "GipszJakab123",
    };
    const address:Address = {
        city: "Baja",
        postal: "6500",
        street: "József Tér",
        number: "6",
        floor: null,
        door: null
    };
    api.userRegister(user, address).then((res) => {
        expect(res.data.message).toEqual('Helytelen E-mail formátum!');
    });
})
test('User register attempt (Invalid phone number formatting)', () => {
    const user:User = {
        userName: "GJakab12",
        fullName: "Gipsz Jakab",
        email: "gipsz.jakab@gmail.com",
        phoneNumber: "+36 30 123 1234",
        password: "GipszJakab123",
    };
    const address:Address = {
        city: "Baja",
        postal: "6500",
        street: "József Tér",
        number: "6",
        floor: null,
        door: null
    };
    api.userRegister(user, address).then((res) => {
        expect(res.data.message).toEqual('Helytelen Telefonszám formátum!');
    });
})
test('User register attempt (Invalid postal code)', () => {
    const user:User = {
        userName: "GJakab12",
        fullName: "Gipsz Jakab",
        email: "gipsz.jakab@gmail.com",
        phoneNumber: "06301231234",
        password: "GipszJakab123",
    };
    const address:Address = {
        city: "Baja",
        postal: "Hatezer-ötszáz",
        street: "József Tér",
        number: "6",
        floor: null,
        door: null
    };
    api.userRegister(user, address).then((res) => {
        expect(res.data.message).toEqual('Helytelen irányítószám formátum!');
    });
})
test('User register attempt (Successful login)', () => {
    const user:User = {
        userName: "GJakab12",
        fullName: "Gipsz Jakab",
        email: "gipsz.jakab@gmail.com",
        phoneNumber: "06301231234",
        password: "GipszJakab123",
    };
    const address:Address = {
        city: "Baja",
        postal: "6500",
        street: "József Tér",
        number: "6",
        floor: null,
        door: null
    };
    api.userRegister(user, address).then((res) => {
        userid = res.data.user;
        expect(res.data.message).toEqual('Sikeres Feljegyzés!');
    });
})

test('User activation attempt (Incorrect password)', () => {
    const confirm:string = "";
    api.userActivate(userid, confirm).then((res) => {
        expect(res.data.message).toEqual('A jelszó nem egyezik!');
    });
})
test('User activation attempt (Success)', () => {
    const confirm:string = "GipszJakab123";
    api.userActivate(userid, confirm).then((res) => {
        expect(res.data.message).toEqual('A jelszó nem egyezik!');
    });
})
test('User activation attempt (Already active)', () => {
    const confirm:string = "GipszJakab123";
    api.userActivate(userid, confirm).then((res) => {
        expect(res.data.message).toEqual('A fiók már aktív!');
    });
})

test('User login attempt (Empty data)', () => {
    const userName = "";
    const userPass = "";
    api.userLogin(userName, userPass).then((res) => {
        expect(res.data.message).toEqual('Hiányzó adatok!');
    });
})
test('User login attempt (Non-existant account)', () => {
    const userName = "?";
    const userPass = "GipszJakab123";
    api.userLogin(userName, userPass).then((res) => {
        expect(res.data.message).toEqual('Nem létező felhasználó.');
    });
})
test('User login attempt (Poor password)', () => {
    const userName = "GJakab12";
    const userPass = "j";
    api.userLogin(userName, userPass).then((res) => {
        expect(res.data.message).toEqual('Hibás jelszó.');
    });
})
test('User login attempt (Successful)', () => {
    const userName = "GJakab12";
    const userPass = "GipszJakab123";
    api.userLogin(userName, userPass).then((res) => {
        expect(res.data.message).toEqual('Hibás jelszó.');
    });
})