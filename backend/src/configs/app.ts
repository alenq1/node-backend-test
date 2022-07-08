import express, {Request, Response, NextFunction} from 'express'
import cors from 'cors'
// import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from '../api/routes/main'
import mongoDB from '../services/mongoDB'
// import {CreateAdmin} from '../models/AdminUser'
import mainSettings from '../configs/mainSettings'
import upload from 'express-fileupload'



const { misc} = mainSettings


const app: express.Application = express();
app.set('trust proxy', 'loopback')
app.use(cors(misc.corsOptions))
// app.use(cookieParser())
app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(upload());

// MAIN ROUTE
app.use('/api/', routes)

// MONGODB DATABASE CONNECTION
mongoDB.once('open', () => {
    console.log('connected to MONGO database')
    // CreateAdmin('mongo')
})
mongoDB.on('error', (error) => {console.error(error, 'MONGO CONNECTION ERROR')})

export default app