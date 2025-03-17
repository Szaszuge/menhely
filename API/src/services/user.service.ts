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

    console.log("[SERVICE] USER GENERATED.");
    return generated_user;
}

exports.getStatusByID = async(id:number) => {
    console.log("[SERVICE] GETTING USER STATUS BASED ON ID.")
    const existant = await AppDataSource.manager.findOneBy(User, {id: id})
    if (existant != null){
        console.log(`[SERVICE] USER EXISTS. RETURNING STATUS: ${existant.permit}`)
        return existant.permit;
    }
    console.log(`[SERVICE] USER NON-EXISTANT. RETURNING...`)
    return "non-existent";
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
    const result = await AppDataSource.manager.findOneBy(User, {email: email});
    return result != null;
}

exports.activateByID = async (ID, Confirm) => {
    console.log("[SERVICE] ACTIVATING USER BASED ON ID.");
    const existant = await AppDataSource.manager.findOneBy(User, {id: ID});
    if (existant != null){
        console.log(`[SERVICE] USER EXISTS... COMPAIRING`);
        let match = await bcrypt.compare(Confirm, existant.password)
        if (match){
            console.log("[SERVICE] ACTIVATING USER...");
            await AppDataSource.manager.save({id: ID, permit: Permits.base})
            return "Activated";
        }
        console.log("[SERVICE] PASSWORDS DO NOT MATCH. RETURNING FAILURE.");
        return "Incorrect";
    }
    console.log(`[SERVICE] USER NON-EXISTANT. RETURNING...`)
    return "Illegal";
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