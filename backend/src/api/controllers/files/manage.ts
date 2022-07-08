import {Request, Response} from 'express'
import {listFiles} from '../../../services/FileService'
import {customResponse} from '../../routes/main'

export const manage = async(req:Request, res:Response) => {

    // console.log(req.files, "ESTO ES REQUEST")
    // if(!req.files.file){
    //     const {name, data} = req.files.file
    //     return res.status(400).json(customResponse(true, 'File Error', 'Invalid Data'))
    // }
    
    try{
        const fileLocation = await listFiles()
        
        return res.status(200).json(customResponse('Files List', fileLocation))
    }
    catch(error){
        console.error(error, "upload error")
        return res.status(400).json(customResponse( 'Files List Error', error, true))
    }
    

}