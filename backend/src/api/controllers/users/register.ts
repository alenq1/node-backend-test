import {Request, Response} from 'express'
import {default as User, IUser} from '../../../models/Users'
import {userRegisterValidation} from '../../../helpers/validators/userRegisterValidation'
import {customResponse} from '../../routes/main'


export const register = async(req:Request, res:Response) => {
    
    const { error } = await userRegisterValidation(req.body);
    
    if (error) {
        console.log(error, "ERROR VALIDATING REGISTER DATA")
        return res.status(400).send(customResponse('Invalid Data', error.message, true))
    }
        
    const userExists = await User.findOne({ email: req.body.email, $or: [{username: req.body.username}]});
    if (userExists) return res.status(400).send(customResponse('User Error', 'user exists', true));

    try {
        
        const isRegistered =  User.find({username: req.body.username})
        const newUser: IUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,            
        })

        newUser.password = await newUser.encryptPassword(newUser.password)
        const registerUser = await newUser.save()

        res.status(201).send(customResponse(
            'Register Success', 
            `your user ${newUser.username} has been registered`
        ))
        console.log('USER REGISTER')


    } catch (error: any) {
        res.status(500).send(customResponse('Register Error', error, true));
        console.log(error, 'REGISTER USER ERROR')
    }
    
}