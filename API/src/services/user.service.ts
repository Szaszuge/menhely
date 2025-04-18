import { Console } from "console";
import { AppDataSource } from "../data-source";
import { Address } from "../entity/Address";
import { Permits, User } from "../entity/User";
import { UserView } from "../entity/view/user.view";
import { AnyARecord } from "dns";
import { CronJob } from 'cron';
import { LessThan } from "typeorm";

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

exports.getStatusByID = async(id:string) => {
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
            if (existant.permit != Permits.limbo && existant.permit != Permits.banned){
                return "Already Active";
            }
            else if (existant.permit == Permits.banned){
                return "Banished";
            }
            await AppDataSource
            .createQueryBuilder()
            .update(User)
            .set({ permit: Permits.base })
            .where("id = :id", { id: ID })
            .execute();
            console.log("[SERVICE] USER ACTIVATED?");
            const activated = await AppDataSource.manager.findOneBy(User, {id: ID});
            if (activated.permit == Permits.base) {
                return "Activated";
            }
            return "Problem";
        }
        console.log("[SERVICE] PASSWORDS DO NOT MATCH. RETURNING FAILURE.");
        return "Incorrect";
    }
    console.log(`[SERVICE] USER NON-EXISTANT. RETURNING...`)
    return "Illegal";
}

const job = new CronJob(
	'0 0,15,30,45 * * * *', // cronTime
	async function () {

		console.log("[SERVICE] DELETE EXPIRED USERS");
        const date = new Date();
        date.setDate(date.getDate() - 1);
        let expired = await AppDataSource.manager.findBy(User, {created_at: LessThan(date), permit: Permits.limbo})
        console.log(`${expired.length} USERS ARE TO BE DELETED.`);
        if (expired.length > 0) {
            await AppDataSource.manager.delete(User, expired);
        }

	}, // onTick
	null, // onComplete
	true, // start
	'Europe/Budapest' // timeZone
);

exports.loginUser = async (username, password) => {
    console.log(`[SERVICE] LOGIN ATTEMPT by '${username}'`);
    const user = await AppDataSource.manager.findOneBy(User, {userName: username});
    if (!user) {
        console.log(`[SERVICE] NO USER FOUND BY NAME '${username}'. RETURNING...`)
        return ";";
    }
    if (!await bcrypt.compare(password, user.password)){
        `[SERVICE] LOGIN ATTEMPT FAILED by '${username}'. RETURNING...`
        return ":";
    }

    const token = generateToken({ id: user.id, name: user.userName, email: user.email, role: user.permit});
    return { token }; 
}

exports.recover = async (email) => {
    
    console.log(`[SERVICE] RECOVER BY EMAIL (${email})`);
    const result = await AppDataSource.manager.findOneBy(User, {email: email});
    if (result != null && (result.permit == Permits.base)){
        await AppDataSource
            .createQueryBuilder()
            .update(User)
            .set({ permit: Permits.pwedit })
            .where("email = :email", { email: email })
            .execute();
            return true;
    }
    return false;
}
exports.changePWD = async (id, pass) => {
    console.log(`[SERVICE] CHANGE PASSWORD (${id})`)
    const result = await AppDataSource.manager.findOneBy(User, {id: id});
    if (result != null) {
        const hashedPassword = await bcrypt.hash(pass, 10);
        await AppDataSource
        .createQueryBuilder()
        .update(User)
        .set({ permit: Permits.base, password: hashedPassword })
        .where("id = :id", { id: id })
        .execute();
        return true;
    }
    return false;
}
exports.RevertPasswordChange = async (id) => {
    const result = await AppDataSource.manager.findOneBy(User, {id: id});
    if (result != null) {
        await AppDataSource
        .createQueryBuilder()
        .update(User)
        .set({ permit: Permits.base})
        .where("id = :id", { id: id })
        .execute();
        return true;
    }
    return false;
}
exports.getMailDataByMail = async (email) => {
    const result = await AppDataSource.manager.findOneBy(User, {email: email});
    const maildata = {
        id: result.id,
        userName: result.userName,
    }
    return maildata;
}
exports.getAllUsers = async () => {
    const users = await AppDataSource.manager.find(UserView);
    return users;
} 