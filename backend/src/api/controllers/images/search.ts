import {Request, Response} from 'express'
import { imageService } from '../../../services/imageService'
import {customResponse} from '../../routes/main'

export const search = async(req:Request, res:Response) => {

    const {find} = req.body
    if(!find) return res.status(400).json(customResponse('request error', 'not search provided', true))
    // console.log(search, "search string")
    
    try{
        const imageData: any = await imageService.getImageData(find)    
        
        if(imageData.length === 0){
            return res.status(400).json(customResponse('imagesearch Error', 'Image Not Found', true))
        }
        return res.status(200).json(customResponse('image search data', imageData[0].links.download))
    }
    catch(error){
        console.error(error, "image error")
        return res.status(400).json(customResponse('imagesearch Error', error, true))
    }
    
}