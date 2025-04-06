export const uploadFile = (req, res, next) => {
    try {
        console.log('Body:', req.body);
        console.log('File:', req.file);
        // Ellenőrizzük, hogy van-e feltöltött fájl
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Nem található feltöltött fájl.',
            });
        }

        // Feltöltött fájl adatai
        const file = req.file;

        res.status(200).json({
            success: true,
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
