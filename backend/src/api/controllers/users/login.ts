import {Request, Response} from 'express'
import {loginValidation} from '../../../helpers/validators/userLoginValidation'
import {customResponse} from '../../routes/main'
import {default as User, IUser} from '../../../models/Users'



export const login = async (req:Request, res:Response) => {
        // //COMMON VALIDATION
    const { error } = await loginValidation(req.body);
    if (error) return res.status(400).send(customResponse('Login Failed', 'Invalid Data', true));
            
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send(customResponse('Login Failed', 'User or password error', true));
    
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).send(customResponse('Login Failed', 'User or password error', true));    

    try{
        const accessToken: string = await user.generateAccessToken(req.body.username, user.id)
        const refreshToken: string = await user.generateRefreshToken(req.body.username, user.id)
        const {username, _id} = user
    
        res.status(200).send(customResponse('Login Success',{username, _id, accessToken, refreshToken}));
        
    } catch (error: any) {
        res.status(500).send(customResponse('Login Error', error, true));
        console.log(error, 'LOGIN USER ERROR')
    }
    
}
