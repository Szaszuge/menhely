export const uploadFile = (req, res, next) => {
    try {
        // Ellenőrizzük, hogy van-e feltöltött fájl
        if (!req.file) {
            return res.status(200).json({
                message: 'Nincs fájl.',
            });
        }

        // Feltöltött fájl adatai
        const file = req.file;

        res.status(201).json({
            message: 'Fájl sikeresen feltöltve!',
            data: {
                filename: file.filename,
                path: file.path,
                mimetype: file.mimetype,
                size: file.size,
            },
        });
        next();
    } 
    catch (error) {
        next(error); 
    }
};
