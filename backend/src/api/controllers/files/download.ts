import {Request, Response} from 'express'
import {downloadFile} from '../../../services/FileService'
import {customResponse} from '../../routes/main'

export const download = async(req:Request, res:Response) => {

    const {key} = req.params
        
    try{
        const file = await downloadFile(key)
        console.log(file, "FILE DOWNLOAD CONTROLLER")
        return res.status(200).download(file)
    }
    catch(error){
        console.error(error, "upload error")
        return res.status(400).json(customResponse('Files DOWNLOAD Error', error, true))
    }


}