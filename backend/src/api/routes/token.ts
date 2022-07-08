import {Router} from 'express'
import {refreshToken} from '../controllers/token/refresh'
import {validateRefreshToken} from '../middlewares/tokenCheck'

const tokenRouter: Router = Router({
    mergeParams: true
})

tokenRouter.post('/refresh/',validateRefreshToken, refreshToken)

//

export default tokenRouter