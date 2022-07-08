import {Request, Response} from 'express'
import {uploadService} from '../../../services/FileService'
import {imageService} from '../../../services/imageService'
import {customResponse} from '../../routes/main'
import mainSettings from '../../../configs/mainSettings'
import fs from 'fs' 
import path from 'path'


export const upload = async(req:Request, res:Response) => {


    const {downloadPath: {images}} = mainSettings
    const now = Date.now();
    const fileName = `${now}dowloadUploadTest.jpg`
    const localFilePath = path.resolve(__dirname, `../../../${images}`, fileName);    
    const {find} = req.body
    if(!find) return res.status(400).json(customResponse('request error', 'not search provided', true))

    
    try{
        
        await imageService.downloadImage(find, localFilePath)                
        const fileStream = await fs.createReadStream(localFilePath)
        const fileToBeUpload = {
            files:{
                name: fileName,
                data: fileStream
            }
        }

        // console.log(fileToBeUpload, "LO QUE SE VA ASUBIR")

        const fileLocation = await uploadService(fileToBeUpload)        
        return res.status(200).json(customResponse('File Uploaded', fileLocation))
    }
    catch(error){
        console.error(error, "upload error")
        return res.status(400).json(customResponse('Upload Error', error, true))
    }
    
    // returning fileupload location
    
}