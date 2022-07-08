# node-backend-test

```

```
## Features
    -  Se utilzo el framework express con soporte de Typescript
    -  Comandos `npm run start:dev` para desarrollo
    -  Comandos `npm run build` y `npm run start:server` para compilar a js y arrancar la aplicacion
    -  Uso de nodemon para recarga rapida y morgan para logs en consola
    -  Base de datos MongoDB dockerizada
    -  Uso de variables de entorno y archivo principal de configuracion de la aplicacion (/src/configs/mainSettings)

### Endpoints
    
### Login (api/user/login) 
        - Metodo POST se ingresa las credenciales en el body en formato json de la siguiente forma
        
        ```json
        {
            "username": "user3",
            "password": "user1234"
        }
        ```

        - La entrada de estos campos esta con una validacion que sean de tipo string y la contraseña de minimo 6 caracteres

        - La respuesta sera en formato json de la siguiente forma siendo lo mas destacado los campos de accessToken y refreshToken que se necesitaran colocar en en los demas endpoints para poder realizar las peticiones

    ``` json
        {
            "error": false,
            "status": "Login Success",
            "message": {
                "username": "user3",
                "_id": "62c78677384d4a71fe0cd442",
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjMiLCJpZCI6IjYyYzc4Njc3Mzg0ZDRhNzFmZTBjZDQ0MiIsImlhdCI6MTY1NzI0ODgyNCwiZXhwIjoxNjU3MjQ5NDI0fQ.SjRqOTjWKnIYXu2bU2aCdrVslsMJvnR5lV1zsTqeW6I",
                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjMiLCJpZCI6IjYyYzc4Njc3Mzg0ZDRhNzFmZTBjZDQ0MiIsImlhdCI6MTY1NzI0ODgyNCwiZXhwIjoxNjU3MjkyMDI0fQ.ON6APrXyIiHKB87ZWMzMVw1tx1QZ0TN46SB8Uk06FK0"
            }
        }
    ```
### Registro (api/user/register)
        - Metodo POST se ingresa las credenciales iniciales en el body en formato json de la siguiente forma
        
        ```json
        {
            "username": "user4",
            "password": "user4567",
            "email": "user4@user.com"
        }
        ```

        - La entrada de estos campos esta con las siguientes validaciones
            - username: 
                - alfanumerico
                - minimo 4 caracteres
                - maximo 12 caracteres
                - campo obligatorio
            - password:
                -  requiere ser compatible con la siguiente expresion regular /^[a-zA-Z0-9]{3,30}$/
                -  campo obligatorio
            - email:
                - debe ser foramto valido de mail con extension .com o .net   
                - campo obligatorio

        - Respuesta de un registro satisfactorio

        ```json
            {
                "error": false,
                "status": "Register Success",
                "message": "your user user4 has been registered"
            }
        ```

### Recuperacion de contraseña con email (api/user/recover)
        - Metodo POST se ingresa el email del usuario en el body en formato json de la siguiente forma

        ```json
        {
            "email": "test@test.com"
        }   
        ```

        - Para la recuperacion de contraseña se crea un password aleatorio el cual es un uuid que se envia por mail al correo del usuario que envio en la peticion, previa validacion 
        
        - En el mismo proceso se encripta la nueva contraseña y se guarda en la base de datos
        
        - Se utiliza el servicio de mailTrap para el envio y recepcion del correo, las credenciales y parametros para este servicio estan definidas como variables de entorno
        
        - La respuesta a este endpoint se muestra de la siguiente formato
        
        ```json
            {
                "error": false,
                "status": "mail sent"
            } 
        ```
        
        - Para comprobar si efectivamente fue modificada la constraseña se debe de ingresar el valor recibido en el mensaje del correo

        - El mensaje del correo se muestra de la sigiuente formato

        ```
            Hi user3
            Yuor new password is 0bd966d0-3020-479d-9f99-5b8bc6bf3f44 for recover your account
        ```
    
    
### Subida de archivos AWS(/api/file/upload)
        - Metodo POST se ingresa por medio del body como formato files el archivo a subir
        - Adicionalmente para estos endpoints se necesita el access-token en los headers
        - Este token tiene una duracion definida en las variables de entorno o en el archivo de configuracion (mainSettings)

        - La respuesta satisfactoria se muestra de la siguiente forma 
        
        ````json
        {
            "error": false,
            "status": "File Uploaded"
        }
        ```

        - Se destaca que en endpoint se tuvo dificultades para devolver la respuesta proveniente de aws para la ruta del archivo, sin embargo se dejo un console.log como muestra que de los datos de la siguiente forma 

        ```json
        {
            Expiration: 'expiry-date="Sun, 10 Jul 2022 00:00:00 GMT", rule-id="Vencimiento De Archivos"',
            ETag: '"dfa1e952efaba21061803876726b74fd"',
            Location: 'https://aluxion-testing.s3.amazonaws.com/1657252357166galaxy1.jpg',
            Key: '1657252357166galaxy1.jpg',
            Bucket: 'aluxion-testing'
        } FILE UPLOADED SERVICE        
        ```

### Listado de archivos AWS (/api/file/manage)   
        - Metodo GET este endpoint es utilitario para listar los nombres de los archivos que estan en el bucket S3 para poder realizar la descarga de los mismos
        - Necesita el access-token en los headers
        - La respuesta satisfactoria se muestra de la siguiente forma

        ```json
        {
            "error": false,
            "status": "Files List",
            "message": [                
                "1657212788396dowloadUploadTest",
                "1657215476110coding-924920_1920.jpg" 
            ]
        }
        ```

### Bajada de archivos AWS (/api/file/download/:key)
        - Metodo POST se ingresa en el parametro key en de url con el nombre del archivo a descargar por ejemplo
        - Necesita el access-token en los headers

        `/api/file/download/16572476927981657247691778dowloadUploadTest.jpg`

        - Esto crea un archivo con un el respectivo nombre en la carpeta /src/temp/files/ donde se puede comprobar que se ha descargado el archivo
        
        - Este endpoint presenta problemas en la respuesta final

### Buscador de Imagenes Online (api/image/search)
        - Metodo POST se ingresa en el parametro find en el body en formato json de la siguiente forma               
        
        ```json
            {"find": "forest"}
        ```

        - Necesita el access-token en los headers
        - La respuesta satisfactoria se muestra de la siguiente forma
        
        ```json
        {
            "error": false,
            "status": "image search data",
            "message": "https://unsplash.com/photos/7nrsVjvALnA/download?ixid=MnwzNDQxMjl8MHwxfHNlYXJjaHwxfHx0cmFmZmljfGVufDB8fHx8MTY1NzI0NzYyMw"
        }
        ```
        - Para este endpoint se utilizo el servicio de unsplash con las credenciales para acceder a su api, estas credenciales se configuran desde variable de entorno y archivo de configuracion (mainSettings)

        - El parametro message sera la url necesaria para poder ejecutar el proximo endpoint de subida de imagen 

### Subida de Imagen a AWS desde API externa (/api/image/upload)
        - Metodo POST se ingresa en el parametro find en el body en formato json de la siguiente forma

        ```json 
        {
         "find": "https://unsplash.com/photos/7nrsVjvALnA/download?ixid=MnwzNDQxMjl8MHwxfHNlYXJjaHwxfHx0cmFmZmljfGVufDB8fHx8MTY1NzI0NzYyMw"
        }
        ```
        - Necesita el access-token en los headers
        - El comportamiento de respuesta es igual al del endpoint de subida de archivos, con la diferencia de que, en primer lugar, hace una peticion de descarga a la api externa (unsplash), y crea un archivo en la carpeta /src/temp/images, el cual finalmente se sube al bucket S3 usando el mismo metodo upload
        - Cabe destacar que igualmente se puede comprobar la subida del archivo revisando la respuesta posterioir por console.log, a treaves del endpoint de listado o revisar directamente desde el administrador del bucket S3

    Token Refresh (/api/token/refresh)
        - Metodo POST se ingresa por medio de los header el parametro refresh-token proporcionado al momento de hacer login
        - Este token se utiliza luego de que se haya vencido el accessToken luego pasado un tiempo
        - Este token tiene una duracion definida en las variables de entorno o en el archivo de configuracion (mainSettings)
        - La respuesta contiene un nuevo accessToken

        ```json
        {
            "error": false,
            "status": "Token Generated",
            "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjQiLCJpZCI6IjYyYzc4NmJhOTc5OWExNTkxNGQwYTZhMSIsImlhdCI6MTY1NzI1MjI5OCwiZXhwIjoxNjU3MjUyODk4fQ.Ggdfx-toAJ4MLIJjnHT3v08Pony-JqqrZd2Mrvqtak4"
        }
        ``` 
### Docker

    - El servicio de base de datos mongdb y la aplicacion node estan configuradas en un archivo docker-compose.yml para arrancar los servicios el comando es el siguiente

    ` docker-compose up -d `

    - En el archivo /entrypoint/start_server.sh se ejecutan comandos que se pueden utilizar para arrancar en modo desarrollo o compilado 