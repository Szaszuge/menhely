import { AppDataSource } from "../data-source";
import { Address } from "../entity/Address";
import { Permits, User } from "../entity/User";

const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');


exports.reserveUser = async (userName, fullName, password, email, phoneNumber, address:Address) => {

    console.log("Attempting to reserve user...");
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = new User();
    user.userName = userName;
    user.fullName = fullName;
    user.password = hashedPassword;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.address = address;

    user.permit = Permits.limbo;

    await AppDataSource.manager.save(user);
    console.log(`User reserved: ${user.userName} (${user.email})`)
    return user;
}

exports.address = async(address:Address) => {
    const existant = await AppDataSource.manager.findOneBy(Address, {city: address.city, postal: address.postal, street: address.street, number: address.number, floor: address.floor, door: address.door})
    if (existant != null){
        return existant.id;
    }
    AppDataSource.manager.save(address);

    return await AppDataSource.manager.findOneBy(Address, {city: address.city, postal: address.postal, street: address.street, number: address.number, floor: address.floor, door: address.door});
}

exports.IsEmailUsed = async (email) => {
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