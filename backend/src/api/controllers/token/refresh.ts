import {Request, Response} from 'express'
import {customResponse} from '../../routes/main'
import {default as User, IUser} from '../../../models/Users'


export const refreshToken = async (req:Request, res:Response) => {
    
    //console.log(req.body.user, "user from middleware with token decipher")

    try {
                
        const user = await User.findOne({ username: req.body.user });
        if (!user) return res.status(400).send(customResponse('Login Failed', 'Invalid User'));
        ///
        const accessToken = await user.generateAccessToken(req.body.user, user._id)
        //res.append('access-token', accessToken)
        res.status(200).send(customResponse('Token Generated', accessToken));
                
    } 
    catch (error) {
        res.status(401).send(customResponse('Token Error', error, true));
    }
}