import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';



interface MulterRequest extends Request {
    file?: Express.Multer.File;
}


const fileFilter = (
    req: MulterRequest, 
    file: Express.Multer.File, 
    cb: FileFilterCallback
) => { 
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de tipo imagen (jpeg, jpg, png).'));
    }
};


const storage = multer.diskStorage({
    destination: (req: MulterRequest, file: Express.Multer.File, cb: (error: any, destination: string) => void) => {
        cb(null, 'uploads/');
    },
    filename: (req: MulterRequest, file: Express.Multer.File, cb: (error: any, filename: string) => void) => {
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
});


const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;
