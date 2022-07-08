import mongoose from 'mongoose'
import mainSettings from '../configs/mainSettings'

const {services:{nosqldb}} = mainSettings

mongoose.connect(nosqldb)
mongoose.Promise = global.Promise;
const mongoDB = mongoose.connection

export default mongoDB