import {Router} from 'express'
import {search} from '../controllers/images/search'
import {upload} from '../controllers/images/upload'
import {validateAccessToken} from '../middlewares/tokenCheck'

const fileRouter: Router = Router({
    mergeParams: true
})


fileRouter.post('/search/', validateAccessToken, search)
fileRouter.post('/upload/', validateAccessToken, upload)
//




export default fileRouter