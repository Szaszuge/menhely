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

    if (!request.details.from || !request.details.type || !request.details.from || !request.details.city || !request.details.year || !request.details.month || !request.details.day){
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
    
    // TODO: Kérelem feltöltése
    animalService.reserveAnimalSurrenderRequest(request, req.file.filename);
    
    return res.status(200).json({message: 'Végigment'});

}