import { Permits } from "../entity/User";

const userService = require('../services/user.service');

export const reserve = async (req, res, next) => {  
    console.log("Reserve called")
    try{
        console.log("Attempting to reserve slot for user...")
        const user = req.body[0];
        const address = req.body[1];
        console.log(user);
        console.log(address);
        console.log("Performing mandatory checks..");

        console.log("Checking missing data...");
        if ( user == undefined || address == undefined || !user.fullName ||!user.userName || !user.password || !user.email || !user.phoneNumber || !user.address.city  || !user.address.postal  || !user.address.street  || !user.address.number){
            console.log("Missing data. Returning...")
            return res.status(203).json({ message: 'Hiányzó adatok!'});
        }
        console.log("Data check passed!");

        if (user.address.floor == undefined) user.address.floor = 0;
        if (user.address.door == undefined) user.address.door = 1;

        console.log("Checking whether email is already in used...")
        if ((await userService.IsEmailUsed(user.email))){
            return res.status(203).json({message: 'Az E-mail már regisztrálva van!'})
        }
        console.log("E-mail check passed!");

        console.log("Validating username...");
        let userValidator = /^[a-zA-Z0-9]{1,16}$/;
        if (!userValidator.test(user.userName)) {
            return res.status(203).json({ message: 'Helytelen felhasználónév!'});
        }
        console.log("Username check passed!");

        console.log("Validating real name...");
        let nameValidator = /^(?=.*\s)[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]{1,50}$/;
        if (!nameValidator.test(user.fullName)) {
            return res.status(203).json({ message: 'Helytelen név formátum!'});
        }
        console.log("Full Name check passed!");

        console.log("Validating E-mail accourding to the RFC 5322 standard...")
        let emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailValidator.test(user.email)) {
            return res.status(203).json({ message: 'Helytelen E-mail formátum!'});
        }
        console.log("E-mail check passed!");

        console.log("Validating phone number...");
        /*
        let phoneValidator = /^\d{11}$/;
        if (!phoneValidator.test(user.phoneNumber)) {
            return res.status(203).json({ message: 'Helytelen Telefonszám formátum!'});
        }
            */
        console.log("Phone number check 'passed'!");

        console.log("Validating postal code...");
        if (isNaN(address.postal)) {
            return res.status(203).json({ message: 'Helytelen irányítószám formátum!'});
        }
        console.log("Phone number check passed!");

        console.log("Address: Assign to if exists, otherwise create...")
        const ad = await userService.address(user.address)
        const generated_user = await userService.reserveUser(user, ad);

        return res.status(201).json({ message: "Sikeres Feljegyzés" , user: generated_user.id});
    }
    catch(error){
        next(error);
    }
}   
export const getStatusByID = async (req, res) => {
    console.log(req.body[0])
    const status = await userService.getStatusByID(req.body[0]);
    setTimeout(() => "Returning Status...", 1000),
    res.status(201).json({ message: "Sikeres Feljegyzés", status: status });
}
export const activateById = async (req, res) => {
    console.log("Activate by ID...");
    console.log("Attempting activation...");
    let x = req.body[0];
    let y = req.body[1];
    const result = await userService.activateByID(x, y);
    setTimeout(() => "Returning results...", 1000);
    switch (result){
        case ("Activated"):
            res.status(200).json({ message: "Sikeres Aktiváció!"});
            break;
        case ("Incorrect"):
            res.status(203).json({ message: "A jelszó nem egyezik!"});
            break;
        case ("Already Active"):
            res.status(203).json({ message: "A fiók már aktív!"});
            break; 
        case ("Banished"):
            res.status(203).json({ message: "A fiók tiltott!"});
            break; 
        case ("Illegal"):
            res.status(203).json({ message: "A fiók nem létezik!"});
            break;
        default:
            res.status(400).json({message: "Van ami nem jó."})
            break;
    }
}
export const login = async (req, res) => {
    const userN = req.body[0];
    const userP = req.body[1];
    if (!userN || !userP){
        return res.status(203).json({ message: 'Hiányzó adatok!'});
    }
    const token = await userService.loginUser(userN, userP);
    if (token == ";") {
        console.log("Nem létező felhasználó");
        return res.status(203).json({message: "Nem létező felhasználó."})
    }
    else if (token == ":") {
        console.log("Rossz jelszó");
        return res.status(203).json({message: "Hibás jelszó."})
    }
    else if (token == "-"){
        return res.status(203).json({message: "A fiókba nem léphet be."})
    }
    return res.status(200).json({ message: "Sikeres bejelentkezés!", token: Object.values(token)[0], success: true });
}
export const recover = async (req, res) => {
    const userE = req.body[0];
    if (await userService.IsEmailUsed(userE)) {
        const answer = await userService.recover(userE);
        if (answer) {
            return res.status(200).json({message: "Most már lehet jelszót váltani."})
        }
        return res.status(203).json({message: "A fiók nem válthat jelszót."});
    }
    return res.status(203).json({message: "Nincs email-hez kötve fiók."});
}
export const resetPass = async (req, res) => {
    const id:string = req.body[0];
    const pass:string = req.body[1];
    const confirm:string = req.body[2];
    const user:Permits = await userService.getStatusByID(id);
    if (user != Permits.pwedit) {
        return res.status(203).json({message: "A fiók nem kért jelszó váltást."});
    }
    if (pass != confirm){
        return res.status(400).json({message: "A két jelszó nem egyezik!"});
    }
    const answer = await userService.changePWD(id, pass)
    if (answer){
        return res.status(202).json({message: "A fiók jelszava sikeresen frissült."});
    }
    return res.status(400).json({message: "Ismeretlen hiba..."});
}
export const revertPass = async (req, res) => {
    const id:string = req.body[0];
    const user:Permits = await userService.getStatusByID(id);
    if (user != Permits.pwedit) {
        return res.status(203).json({message: "A fiók nem kért jelszó váltást.", success: false})
    }
    const result:boolean = await userService.RevertPasswordChange(id);
    if (result) {
        return res.status(200).json({message: "Jelszó változtatási kérelem sikeresen visszavonva.", success: true})
    }
    return res.status(203).json({message: "Valami történt.", success: false});

}
export const mailData = async (req, res) => {
    const userE = req.body[0];
    if (await userService.IsEmailUsed(userE)) {
        const answer = await userService.getMailDataByMail(userE);
        return res.status(200).json({maildata: answer, success: true});
    }
}
export const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    return res.status(200).json({ message: "Sikeres lekérdezés!", users: users });
}
export const Promote = async (req, res) => {
    const id = req.body[0];
    const role:Permits = await userService.getStatusByID(id);
    const answer = await userService.PromoteByID(id, role);
    if (answer) {
        return res.status(200).json({message: "Jogosultság sikeresen módosítva.", success: true})
    }
    return res.status(203).json({message: "Valami történt.", success: false});
}

export const Demote = async (req, res) => {
    const id = req.body[0];
    const role:Permits = await userService.getStatusByID(id);
    const answer = await userService.DemoteByID(id, role);
    if (answer) {
        return res.status(200).json({message: "Jogosultság sikeresen módosítva.", success: true})
    }
    return res.status(203).json({message: "Valami történt.", success: false});
}