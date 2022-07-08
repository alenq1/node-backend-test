import nodemailer from 'nodemailer'
import mainSettings from '../configs/mainSettings'


const {mailRecoverSender:{
    host, port, mailUser,pass
}} = mainSettings


export const emailService = (user: any, token: string) => {
    
    try {
            const transporter = nodemailer.createTransport({
                port: 2525,
                host: host,              
                auth:{
                    user: mailUser,
                    pass: pass
                }
            })

            const options = {
                from: '"Example Team" <from@example.com>',
                to: user.email,
                subject: 'Recover Mail Access',
                text: 'Mail Recover Requested',
                html: `<b>Hi ${user.username}</b><br> Yuor new password is <b>${token}</b> for recover your account`,

            }

            return transporter.sendMail(options, (error:any, info:any) =>{
                if(error){
                    throw new Error(error)
                }
                console.log(info, "mail info Sent")
            })

        }
        
    catch (error: any) {        
            throw new Error(error)    
    }
}