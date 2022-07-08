import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import mainSettings from '../../configs/mainSettings'
import {customResponse} from '../routes/main'

export interface IPayload {
    id: string,
    user: string,
    iat: number,
}

const {
    tokens:{
        accessSecret, 
        refreshSecret
    }
} = mainSettings

export const validateAccessToken = async(req: Request, res: Response, next: NextFunction) => {

    try {
            
        const accesstoken = <string>req.headers['access-token']

        if (!accesstoken || accesstoken === undefined) return res.status(400).send(customResponse('error','token invalid', true))
        
        const payload: any = await jwt.verify(accesstoken, accessSecret) as IPayload;
        req.body.username = payload.user
    
        next()

    } 
    catch (error: any) {
        console.log(error, "error on token validation")
        res.status(401).send(customResponse('Access Denied',error.name, true))
    }    
}

export const validateRefreshToken = async (req:Request, res:Response, next:NextFunction) => {

    try {
            

        const refreshToken = <string>req.headers['refresh-token']
      //console.log(refreshToken, "token refresh received")
        if (!refreshToken || refreshToken === undefined) return res.status(400).send(customResponse('error','token invalid', true))
    
        const payload: any = await jwt.verify(refreshToken, refreshSecret)
      //console.log(payload, "token refresh decipher")
      //console.log(payload.user, "user on refresh for sign access token")
        req.body.user = payload.user
        next()

    } 
    catch (error: any) {
        console.log(error, "error on token validation")
        res.status(401).send(customResponse('Access Denied','error on token validation', true))
    }
}