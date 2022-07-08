import {Request, Response} from 'express'
import {uploadService} from '../../../services/FileService'
import {customResponse} from '../../routes/main'
// import multer from 'multer'


export const upload = async(req:Request, res:Response) => {
    
    
    if(!req.files)  res.status(400).send(customResponse('upload error', 'no file to upload', true)) 

    try{
        const fileToResponse = await uploadService(req.files)
        console.log(fileToResponse, "FILE UPLOADED CONTROLLER")
        return res.status(200).json(customResponse('File Uploaded', fileToResponse ))
        
    }
    catch(error){
        console.error(error, "upload error")
        return res.status(400).json(customResponse('Upload Error', error, true))
    }
    
}