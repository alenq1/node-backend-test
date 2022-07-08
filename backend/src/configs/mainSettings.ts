import dotenv from 'dotenv'

dotenv.config()

const mainSettings = {

    ports:{
        serverPort: process.env.NODE_PORT || 4000,        
    },

    services:{            
        dbtype: process.env.DB_TYPE || 'mongo', // 'sql or 'mongo'
        nosqldb: process.env.MONGODB_URL || 'mongodb://userExample:example@mongo:27017/',    
        s3Bucket: process.env.S3_BUCKET || 'test'
    },
    
    tokens:{
        accessSecret: process.env.ACCESS_TOKEN || 'access',
        expireAccess:'10m',
        refreshSecret: process.env.REFRESH_TOKEN || 'refresh',
        expireRefresh: '12h',
    },
    downloadPath:{
        files: `/temp/files`,
        images: `/temp/images`,
    },
    mailRecoverSender:{
        host: process.env.MAIL_HOST || "smtp.mailtrap.io",
        port: process.env.MAIL_PORT || 2525,        
        mailUser: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },

    saltForPassword: 10,

    urls:{
        s3Bucket:process.env.S3_URL || ""
    },
    
    apikeys: {
        s3BucketKey: process.env.S3_KEY,
        s3Secret: process.env.S3_SECRET,
        unsplashAccesKey: process.env.UNSPLASH_ACCESS_KEY,
        unsplashSecretKey: process.env.UNSPLASH_SECRET_KEY

    },

    // ADDITIONAL HELPER OPTIONS FOR APPS SERVICES

    misc: {        
        corsOptions: {
            origin: [    
            `http://localhost:4000`,            
            "http://ngrok.io", 
            /\.ngrok\.io$/,
            ],
        //origin: false,
        credentials: true
        }
    }
}

export default mainSettings