import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './dto/email.dto';
import { Subject } from 'rxjs';

@Injectable()
export class EmailService {
    constructor(private readonly congigService: ConfigService) { }
    
    async emailTransport() {
        const transporter = nodemailer.createTransport({
            host:this.congigService.get<string>('EMAIL_HOST'),
            port:this.congigService.get<number>('PORT'),
            secure:false,
            auth: {
                user: this.congigService.get<string>('EMAIL_USER'),
                pass: this.congigService.get<string>('EMAIL_PASSWORD')
            },
        })    
        return transporter
    }

    async sendEmail(emailDto: EmailDto,otp:number) {
        const transport =await  this.emailTransport()
        
        const options: nodemailer.sendMailOptions = {
            from: this.congigService.get<string>('EMAIL_USER'),
            to: emailDto.recipients,
            subject: emailDto.subject,
            html:
                `
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                <div style="background-color: white; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
                    <h2>Welcome to Our App</h2>
                    <p>Hello,</p>
                    <p>Your One-Time Password (OTP) is:</p>
                    <h1 style="color: #007bff;">${otp}</h1>
                    <p>This code is valid for 90 seconds. Do not share it with anyone.</p>
                </div>
                </body>
                </html>
                `   
        } 
        try {
            await transport.sendMail(options)
            console.log("Email successfully sent")
        } catch (error) {
           console.log("Error sending mail: ",error)
        }
    }
}
