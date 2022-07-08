import Joi from 'joi'
import {IUser} from '../../models/Users'


const mailExtensions = [
    'com', 
    'net'
]


export const userRegisterValidation = (data: IUser) => {




    const userSchema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(4)
            .max(12)
            .required(),

        password: Joi.string()
            .pattern(/^[a-zA-Z0-9]{3,30}$/)
            .required(),

    //repeat_password: Joi.ref('password'),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: mailExtensions } })
            .required()
    })

return userSchema.validate(data);

}