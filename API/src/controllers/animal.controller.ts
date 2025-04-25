const animalService = require("../services/animal.service")
export const reserve = async (req, res, next) => {
    try {
        JSON.parse(req.body.data);
    } catch (error) {
        return res.status(203).json({message: 'Nem jött át az adat rendesen.'});
    }
    const request = JSON.parse(req.body.data);
    console.log(request);

    if (request.type != 'surrender'){
        return res.status(203).json({ message: 'Hibás vagy helytelen kérelem tipus!'});
    }

    if (!request.user || !request.details.type || !request.details.from || !request.details.city || !request.details.year || !request.details.month || !request.details.day){
        return res.status(203).json({ message: 'Hiányzó adatok!'});
    }
    const request_date = new Date(`${request.details.year}-${request.details.month}-${request.details.day}`);
    const current_date = new Date();

    if (request_date < current_date){
        return res.status(203).json({ message: 'A dátum a múltban van!'});
    }
    current_date.setDate(current_date.getDate() + 2)

    if (request_date < current_date){
        return res.status(203).json({ message: 'Nincs idő a feldolgozásra! (A kérés és leadás közt legalább 2 nap legyen!)'});
    }
    
    await animalService.reserveAnimalSurrenderRequest(request, req.file?.filename);
    
    return res.status(200).json({message: 'Végigment'});

}

export const update = async (req, res) => {
    
    try {
        JSON.parse(req.body.data);
    } catch (error) {
        return res.status(203).json({message: 'Nem jött át az adat rendesen.'});
    }
    let allGood = false;
    const request = JSON.parse(req.body.data);
    console.log(request);

    if (request.name != '' && request.age != '' && request.gender != '' && request.from != '' && request.details.paragraphs.length > 0) {
        allGood = true;
    }

    const answer = await animalService.updateAnimal(request, req.file?.filename, allGood);
    if (!answer) {
        return res.status(203).json({message: 'Nem sikerült frissíteni'});
    }
    if (allGood) {
        return res.status(200).json({message: 'Sikeres frissítés (Az állat publikálható)'});
    }
    return res.status(200).json({message: 'Sikeres frissítés (Az állat nem publikálható)'});
}

export const getByID = async (req, res) => {
    const animal = await animalService.getByID(req.body[0]);
    return res.status(200).json({message: 'Sikeres lekérdezés!', animal});
}
export const getAllAnimals = async (req, res, next) => {
    const animals = await animalService.getAllAnimals();
    return res.status(200).json({message: 'Sikeres lekérdezés!', animals: animals});
}