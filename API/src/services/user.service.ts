import { Console } from "console";
import { AppDataSource } from "../data-source";
import { Address } from "../entity/Address";
import { Permits, User } from "../entity/User";
import { AnyARecord } from "dns";

const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');


exports.reserveUser = async (user:any, ad:any) => {

    console.log("[SERVICE] RESERVING USER...");
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log("[SERVICE] GENERATING USER...");
    let pushed_user = new User();
    pushed_user.userName = user.userName;
    pushed_user.fullName = user.fullName;
    pushed_user.password = hashedPassword;
    pushed_user.email = user.email;
    pushed_user.phoneNumber = user.phoneNumber;
    pushed_user.address = ad;
    pushed_user.permit = Permits.limbo;
    console.log("[SERVICE] PUSHING GENERATED USER INSTANCE...");

    let generated_user = await AppDataSource.manager.save(pushed_user);

    return generated_user;
}

exports.address = async(address:Address) => {
    console.log(`[SERVICE] ADDRESS IS: {\n\t${address.city}, ${address.postal}\n\t${address.street} ${address.number}\n\t${!!address.floor ? (address.floor + ". FLOOR, ") : ""}${!!address.door ? (address.door + ". DOOR") : ""}\n}`)

    const existant = await AppDataSource.manager.findOneBy(Address, {city: address.city, postal: address.postal, street: address.street, number: address.number, floor: address.floor, door: address.door})
    if (existant != null){
        console.log(`[SERVICE] ADDRESS EXISTS. RETURNING ID...`)
        return existant.id;
    }
    console.log(`[SERVICE] ADDRESS NON-EXISTANT. GENERATING...`)

    const pushed_address = new Address();
    pushed_address.city = address.city;
    pushed_address.postal = Number(address.postal);
    pushed_address.street = address.street;
    pushed_address.number = address.number;
    pushed_address.floor = address.floor;
    pushed_address.door = address.door;

    console.log("[SERVICE] PUSHING GENERATED ADDRESS INSTANCE...");
    const generated_address = await AppDataSource.manager.save(pushed_address);

    console.log(`[SERVICE] ADDRESS CREATED. RETURNING ID...`)

    return generated_address.id;

}

exports.IsEmailUsed = async (email) => {
    console.log(`[SERVICE] IS EMAILED USED (${email})`);
    const result = await AppDataSource.manager.findOneBy(User, {email: email})
    return result != null;
}

/*
exports.loginUser = async (email, password) => {
    const user = await AppDataSource.manager.findOneBy(User, {email: email});
    if (!user) throw new Error('Nem regisztrált felhasználó!');
    if (!await bcrypt.compare(password, user.password)) throw new Error('Hibás jelszó!');

    const token = generateToken({ id: user.id, name: user.name, email: user.email});
    return { token }; 
}
*/

/*
exports.getAllUsers = async () => {
    return await userMod.findAll({
        attributes: {exclude: ['password']}
    });
}


*/