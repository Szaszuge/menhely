const animalService = require("../services/animal.service")

export const reserve = async (req, res, next) => {
    console.log(req.body);
    console.log("Animal reserve called");

}