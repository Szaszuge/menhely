const userService = require('../services/user.service');

export const reserve = async (req, res, next) => {  
    console.log("Reserve called")
    try{
        console.log("Attempting to reserve slot for user...")
        const user = req.body[0];
        const address = req.body[1];
        console.log(user);
        console.log("Performing mandatory checks..");

        console.log("Checking missing data...");
        if ( !user.fullName ||!user.userName || !user.password || !user.email || !user.phoneNumber || !user.address.city  || !user.address.postal  || !user.address.street  || !user.address.number ){
            console.log("Missing data. Returning...")
            return res.status(203).json({ message: 'Hiányzó adatok!'});
        }
        console.log("Data check passed!");

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
        let nameValidator = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]{1,50}$/;
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
        let phoneValidator = /^\d{11}$/;
        if (!phoneValidator.test(user.phoneNumber)) {
            return res.status(203).json({ message: 'Helytelen Telefonszám formátum!'});
        }
        console.log("Phone number check passed!");

        console.log("Address: Assign to if exists, otherwise create...")
        const ad = await userService.address(user.address)
        const generated_user = await userService.reserveUser(user, ad);

        res.status(201).json({ message: "Sikeres Feljegyzés" });
    }
    catch(error){
        next(error);
    }
}   
export const getStatusByID = async (req, res) => {
    console.log(req.body[0])
    const status = await userService.getStatusByID(req.body[0]);
    console.log("Returning Status...")
    res.status(201).json({ message: "Sikeres Feljegyzés", status: status });
}