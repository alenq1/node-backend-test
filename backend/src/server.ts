import app from './configs/app'
import mainSettings from './configs/mainSettings'

const {
    ports: {serverPort}
} = mainSettings


app.listen(serverPort, () => {
    console.log(`Express server is listening at ${serverPort}`)
})
