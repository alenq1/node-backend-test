import {Router} from 'express'
import {login} from '../controllers/users/login'
import {register} from '../controllers/users/register'
import {recover} from '../controllers/users/recover'

const userRouter: Router = Router({
    mergeParams: true
  })

userRouter.post('/register/', register)
userRouter.post('/login/', login)
userRouter.post('/recover/', recover)

export default userRouter