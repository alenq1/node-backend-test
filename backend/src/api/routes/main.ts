import {Router, Request, Response, RouterOptions} from 'express'
import userRouter from './users'
import fileRouter from './files'
import imageRouter from './images'
import tokenRouter from './token'


const routes: Router = Router()

//main routes

routes.use('/user/', userRouter)
routes.use('/file/', fileRouter)
routes.use('/image/', imageRouter)
routes.use('/token/', tokenRouter)


export const customResponse: any = (status: string, message: any, error:boolean = false) => {
    return {error, status, message}
}

routes.get('/health/', (req: Request, res: Response) => res.status(200).send(customResponse('ok', 'active')))




export default routes