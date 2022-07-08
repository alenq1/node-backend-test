import {Request, Response} from 'express'
import {default as User, IUser} from '../../../models/Users'
import {customResponse} from '../../routes/main'
import {emailService} from '../../../services/mailService'
import { v4 as uuidv4 } from 'uuid';



export const recover = async (req:Request, res:Response) => {

    try{
        const {email} = req.body
        if(!email)  res.status(400).send(customResponse('recover error', 'no email field', true)) 
        const user = await User.findOne({ email: email});
        if (!user)  res.status(400).send(customResponse('recover Error', 'email not found', true));
        else {
            // console.log(user, "USER EXIST")

            const ramdomPassword = uuidv4()
            const newPassword = await user.encryptPassword(ramdomPassword)
            user.password = newPassword
            await user.save()
            
            const sendMail = await emailService(user, ramdomPassword)
            res.status(200).send(customResponse('mail sent', sendMail))
        }
    
    }catch(error){
        console.log(error, 'REGISTER USER ERROR')
        res.status(500).send(customResponse('recover Error', error, true));
        
    }

}

export const refreshToken = async (req:Request, res:Response) => {

    
    //console.log(req.body.user, "user from middleware with token decipher")

// try {
    
//     if (db === 'mongo') {
//         //MONGO
//         //const user = new User()
//         const user = await UserM.findOne({ username: req.body.user });
//         if (!user) return res.status(400).send(customResponse('Login Failed', 'Invalid User'));
//         ///
//         const accessToken = await user.generateAccessToken(req.body.user, user._id)
//         //res.append('access-token', accessToken)
//         res.status(200).send(customResponse('Token Generated', accessToken));
//     }
    
//     if (db === 'sql') {
//         //SQL
//     const userRepository = getRepository<Users>("Users")
//     let user: Users
//     try {
//         user = await userRepository.findOneOrFail({ where: { username: req.body.user } });
//     } catch (error) {
//         return res.status(400).send(customResponse('Login Failed', 'Invalid User'));
//     }

//     const accessToken = await user.generateAccessToken(req.body.user, user._id)
//     //res.append('access-token', accessToken)
//     res.status(200).send(customResponse('Token Generated', accessToken));
//     // END SQL     
//     }
    
    
    
// } 
// catch (error) {
//     res.status(401).send(customResponse('Token Error', error));
// }
}


export const listUsers = async (req:Request, res:Response) => {

// //MONGO
// if (db === 'mongo') {
//     const user = await UserM.findOne({ username: req.body.username });
//     if (!user) return res.status(401).send(customResponse('Access Denied', 'Invalid User'));

//     if (user.role === 'admin' && user.active === true) {
    
//         try {
        
//             const all: IUser[] = await UserM.find()        
//             res.status(200).send(customResponse('ok', all));

//         } 
    
//         catch (error) {

//             res.status(404).send(customResponse('error find users', error));

//         }
//     }
    
//     else{
        
//         res.status(403).send(customResponse('Access Denied', 'You are not allowed to access this page'));
    
//     }

//     //END MONGO

// }

// if (db === 'sql') {
    
//     const userRepository = getRepository<Users>("Users")
//     let user: Users
//     user = await userRepository.findOneOrFail({ where: { username: req.body.username } });
    
//     if (!user) return res.status(401).send(customResponse('Access Denied', 'Invalid User'));
    
    
//     if (user.role === 'admin' && user.active === true) {
    
//         try {
        
//             const all = await getRepository<Users>("Users").find()
//             res.status(200).send(customResponse('ok', all));
        
//         } 
    
//         catch (error) {
        
//             res.status(404).send(customResponse('error find users', error));
        
//         }
//     }

//     else{
        
//         res.status(403).send(customResponse('Access Denied', 'You are not allowed to access this page'));
    
//     }        
// }
}


export const updateUser = async (req:Request, res:Response) => {

//console.log(req.body, "BODY FROM MIDLEWARE VALIDATE UPADTE")

// const {rawdata} = req.body

// if (db === 'mongo') {
    
//     try {
//         //MONGO
//         const toUpdate: any = await UserM.findByIdAndUpdate(req.params.id, 
//             rawdata,
//             {new: true})

//         const { _id, username, email, role, active} = toUpdate
//         res.status(200).send(customResponse('updated', { _id, username, email, role, active}))  
//         console.log(toUpdate, "DATA MODIFIED")
        
//     } 
//     catch (error) {
//         console.log(error, "UPDATE ERROR")
//         res.status(500).send(customResponse('error', error))
//     }
// }

// if (db === 'sql') {
    
//     try {

//         //SQL
//         const userRepository = getRepository<Users>("Users")
//         let user: Users
//         user = await userRepository.findOneOrFail(req.params.id);
//         userRepository.merge(user, rawdata)
//         const toUpdate = await userRepository.save(user)
//         const { _id, username, email, role, active} = toUpdate
//         //
//         //console.log(toUpdate, "DATA MODIFIED")

//         res.status(200).send(customResponse('updated', {_id, username, email, role, active}))  
//     }  
//     catch (error) {
//         console.log(error, "UPDATE ERROR")
//         res.status(500).send(customResponse('error', error))
//     }
// }
}

export const userProfile = async(req: Request, res:Response): Promise<void>  => {

//console.log(req.params, "get single")

// if (db === 'mongo') {
//     try {
        
//         const data = await UserM.findOne({_id: req.params.id})
//         res.status(200).send(customResponse('ok', [data]))    

//     } catch (error) {
//         res.status(404).send(customResponse('error', error))
//     }

// }

// if (db === 'sql') {
//     try {
        
//         const userRepository = getRepository<Users>("Users")
//         let data: Users
//         data = await userRepository.findOneOrFail(req.params.id);
//         res.status(200).send(customResponse('ok', [data]))

//     } 
//     catch (error) {
        
//         res.status(404).send(customResponse('error', error))
        
//     }        
// }
}

export const deleteUser = async(req: Request, res:Response): Promise<void> => {

//console.log(req.params, "delete")

// if (db === 'mongo') {
//     try {
//         //MONGO
//         const toDelete = await UserM.findByIdAndRemove(req.params.id)
//         console.log(toDelete, "DATA DELETED")
//         //res.status(404).send(customResponse('Option Disabled', 'Temporal maintenance disabled'))  
//         res.status(204).send(customResponse('Deleted', `User ${toDelete} has been deleted`))  

//     } catch (error) {
//         res.status(500).send(customResponse('error', error))
//     }
    
// }

// if (db === 'sql') {
//     try {

//         const userRepository = getRepository<Users>("Users")
//         let user: Users
//         const toDelete = await userRepository.delete(req.params.id)
    
//         //console.log(toDelete, "DATA DELETED")
//         //res.status(404).send(customResponse('Option Disabled', 'Temporal maintenance disabled'))  
//         res.status(204).send(customResponse('Deleted', `User ${toDelete} has been deleted`))  
//     } 
//     catch (error) {
//         res.status(500).send(customResponse('error', error))
//     }        
// }    
}
