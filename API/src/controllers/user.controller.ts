const userService = require('../services/user.service');

export const reserve = async (req, res, next) => {  
    console.log("Reserve called")
    try{
        console.log("Attempting to reserve slot for user")
        const user = req.body[0];
        const address = req.body[1];
        console.log(user);
        if ( !user.fullName ||!user.userName || !user.password || !user.email || !user.phoneNumber || !user.address.city  || !user.address.postal  || !user.address.street  || !user.address.number ){
            console.log("Hiányzó adatok. Kérés visszadobása.")
            return res.status(203).json({ message: 'Hiányzó adatok!'});
        }
        console.log("Checking whether email is already in used.")
        if ((await userService.IsEmailUsed(user.email))){
            return res.status(203).json({message: 'Az E-mail már regisztrálva van!'})
        }
        console.log("E-mail check passed");
        console.log("Address: Assign to if exists, otherwise create...")
        const ad = await userService.address(user.address)
        const generated_user = await userService.reserveUser(user, ad);

        res.status(201).json({ message: "Sikeres Feljegyzés" });
    }
    catch(error){
        next(error);
    }
}   