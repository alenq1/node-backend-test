import nodeFetch from 'cross-fetch';
import { createApi } from 'unsplash-js';
import  mainSettings from '../configs/mainSettings'
import fetch from 'cross-fetch'
import fs from 'fs'

const { apikeys: {
    unsplashAccesKey}
} = mainSettings

export const unsplashConnect = createApi({
    accessKey: unsplashAccesKey,
    fetch: nodeFetch,
});



export const imageService =  {

    getImageData: async(find: string) =>{
        try{
            const image: any = await unsplashConnect.search.getPhotos({
                query: find,
                page: 1,
                perPage: 1, 
                
            })
            
            const { response} = image            
            return response.results
        }
        catch(error){
            throw (error)
            
        }
    },

    downloadImage: async(location: string, localFilePath: any) =>{
        try{
            const res: any = await fetch(location)

            if(res.status >=400){
                throw new Error("Bad response from server");
            }            

            const image = await res.body.pipe(fs.createWriteStream(localFilePath))            
            
            return image
        }
        catch(error){
            throw (error)
            
        }
    }

}

