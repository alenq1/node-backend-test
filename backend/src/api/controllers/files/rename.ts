import {Request, Response} from 'express'
import {renameFile} from '../../../services/FileService'
import {customResponse} from '../../routes/main'

export const rename = async(req:Request, res:Response) => {

    const {oldName, newName} = req.body

    console.log(oldName, newName, "RENAMES FILEDS")
    
    if(!oldName || !newName) {
        return res.status(400).json(customResponse('rename Error', 'missing ranem fields', true))
    }
    
    try{
        const newFile = await renameFile(oldName, newName)
        console.log(newFile, "FILE REANMED CONTROLLER")
        return res.status(200).json(customResponse('File reanmed success', newFile))
    }
    catch(error){
        console.error(error, "rename error")
        return res.status(400).json(customResponse('Files Rename Error', error, true))
    }


}