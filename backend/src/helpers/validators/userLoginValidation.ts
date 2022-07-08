import Joi from 'joi'
import {IUser} from '../../models/Users'


export const loginValidation = (data: IUser) => {
    const userSchema = Joi.object({
        username: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .min(6)
            .required()
    });
    return userSchema.validate(data);
};