import { expect, test } from 'vitest'
import { ApiService } from './api.service'
import { User } from '../interfaces/user';
import { Address } from '../interfaces/address';

const api = new ApiService();

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
        expect(res.data.message).toBe('Hiányzó adatok!');
    });
})