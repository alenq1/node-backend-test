import AWS from 'aws-sdk'
import mainSettings from '../configs/mainSettings';
import fs from 'fs'
import path from 'path'


interface IS3Params {
    Bucket: any;
    Key: string;
    Body: any, 
    ContentType: string
}


const {
    services: {s3Bucket}, 
    apikeys: {s3BucketKey, s3Secret},
    downloadPath:{files}
} = mainSettings



const s3: any = new AWS.S3({
    accessKeyId: s3BucketKey,
    secretAccessKey: s3Secret,
});

export const uploadService = async(files: any) => {

    // console.log(files.files, "ESTO ES FILE")
    // console.log(files.files.name, "ESTO ES FILENAME")
    // console.log(files.files.data, "ESTO ES FILEDATA")
    const now = Date.now()
    
    const params: IS3Params = {
        Bucket: s3Bucket,
        Key: `${now}${files.files.name}`,
        Body: files.files.data,
        ContentType: "application/octet-stream",
    }
    
    await s3.upload(params, (error: any, data: any) => {
        if(error){
            throw (error)
        }
        console.log(data, "FILE UPLOADED SERVICE")
        return data
    })

    
}

export const downloadFile = async (filename: any) => {
    try {
        
        
        const res = await s3.getObject({ Bucket: s3Bucket, Key: filename }).createReadStream() 
        // console.log(res)        
        const now = Date.now()    
        // const ws = fs.createWriteStream(path.resolve(__dirname, `../temp/files`, `${filename}${now}`))
        const writeFile = await fs.createWriteStream(path.resolve(__dirname, `../temp/files`, `${now}${filename}`))
        
                
        const tempFile = await res.pipe(writeFile)
        console.log(tempFile.path, "PATH");
        return tempFile.path;
    } catch(error) {
        throw ("FILE NOT FOUND")
    }
}

export const deleteFile = async (filename: any) => {
    try {
        await s3.deleteObject({ Bucket: s3Bucket, Key: filename }).promise();
        return { success: true, data: "File deleted Successfully" }
    } catch(error) {
        return { success: false, data: null }
    }
}

export const listFiles = async () => {
    try {
        const files = await s3.listObjectsV2({ Bucket: s3Bucket }).promise();
        const names = files.Contents.map((file: any )=> file.Key)
        
        return names
    } catch(error) {
        throw error
    }
}

export const renameFile = async (oldName: string, newName:string) => {
    try {
        const newFile = await s3.copyObject({
            Bucket: s3Bucket,
            CopySource: `${s3Bucket}/${oldName}`,
            Key: newName
        }).promise()
        .then((response: any) => {            
            console.log(response, 'COPIADO NEW FILE???');
            s3.deleteObject({
                Bucket: s3Bucket,
                Key: oldName
            }).promise()        
            })
            // Error handling is left up to reader
            .catch((error: any) => console.error(error))
        console.log(newFile, "NEWFILE RENOMBRADO???????")
        return newFile
    } catch(error) {
        throw new Error('Rename Error')
    }
}