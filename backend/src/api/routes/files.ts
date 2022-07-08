import {Router} from 'express'
import {download} from '../controllers/files/download'
import {upload} from '../controllers/files/upload'
import {manage} from '../controllers/files/manage'
import {rename} from '../controllers/files/rename'
import {validateAccessToken} from '../middlewares/tokenCheck'

const fileRouter: Router = Router({
    mergeParams: true
})

fileRouter.post('/upload/',validateAccessToken, upload)
fileRouter.post('/download/:key',validateAccessToken, download)
fileRouter.get('/manage/',validateAccessToken, manage)
fileRouter.post('/rename/',validateAccessToken, rename)

//




export default fileRouter