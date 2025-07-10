import { HttpException, Injectable, PayloadTooLargeException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { LoginDto } from './dto/login.dto';
import { HashCompare } from 'src/helper/hashing.helper';
import { JwtService } from '@nestjs/jwt';
import { LoginLogService } from 'src/modules/login-logmodule/login-logmodule.service';
import { LoginViaOtpDto } from './dto/loginOtp.dto';
import { GenerateOtp, VerifyPassword } from 'src/helper/functions.helpers';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { EmailDto } from 'src/email/dto/email.dto';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private loginLogService: LoginLogService
        , @InjectModel(User.name) private userModel: Model<User>,
        private emailService:EmailService
    ) { }
    
// async validateUser(dto: LoginDto, req: Request): Promise<any> {
// const { email, password } = dto;

//         const ip =
//             (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
//             req.socket?.remoteAddress ||
//             'unknown';
//         const user_agent = req.headers['user-agent'] || 'unknown';


//         const user = await this.userService.FindByEmail(email);


//         if (!user) {
//             await this.loginLogService.logLogin({
//                 user_id: 'unknown',
//                 ip,
//                 user_agent,
//                 status: StatusEnum.FAILED,
//             });

//             throw new UnauthorizedException('User not found');
//         }


    //     const isPasswordValid = await bcrypt.compare(password, user.password);
    //     if (!isPasswordValid) {
    //          await this.loginLogService.logLogin({
    //             user_id: user._id.toString(),
    //             ip,
    //             user_agent,
    //             status: StatusEnum.FAILED,
    //         });

    //         throw new UnauthorizedException('Invalid credentials');
    //     }


    //     await this.loginLogService.logLogin({
    //         user_id: user._id.toString(),
    //         ip,
    //         user_agent,
    //         status: StatusEnum.SUCCESS,
    //     });


    //     const { password: _, ...userWithoutPassword } = user.toObject?.() || user;
    //     return userWithoutPassword;
    // }

    async login(loginDto:LoginDto) {
        const user =await this.userService.FindByEmail(loginDto.email)
        if (!user)
            throw new UnauthorizedException;
        const validateUser=await HashCompare(loginDto.password,user.password)
        
        if (!validateUser)
            throw new UnauthorizedException
        
        const payload = {
            sub: user._id,
            email: user.email,
            roles: user.roles
        }   
        user.otp = undefined
        user.otpGenerateTime = undefined
        await user.save()
        const token = await this.jwtService.signAsync(payload)
        return {accessToken:token}
    }

    async otpRequest(email:string) :Promise<string>{
        const user =await this.userService.FindByEmail(email)
        
        if (!user)
            throw new HttpException("No email present", 404)
        
        const otp = GenerateOtp()
        
        await this.userModel.updateOne({ _id: user._id }, { $set: { otp: otp, otpGenerateTime: Date.now() } }).exec()
        const temp = await this.userModel.findById(user._id)
        console.log(temp)
        const emailOptions:EmailDto = {
            recipients: ['susshhiiiii@gmail.com','sushant2k28@gmail.com'],
            subject: 'OTP For Social Media login',                     
        }
        await this.emailService.sendEmail(emailOptions,parseInt(otp))
        return "Your One-Time Password is and is send to your device"
    }


    async otpVerify(loginViaOtp:LoginViaOtpDto) {
        const user =await this.userService.FindByEmail(loginViaOtp.email)
        if (!user)
            throw new HttpException('No email present', 404);

        const verifyPassword = VerifyPassword(user, loginViaOtp.otp)
        if (verifyPassword) {
            const payload =
            {
                sub: user._id,
                email: user.email,
                roles: user.roles
            }        
             user.otp = undefined
            user.otpGenerateTime = undefined
            await user.save()
            const token = await this.jwtService.signAsync(payload)
            return {accessToken:token}
        }

        user.otp = undefined
        user.otpGenerateTime = undefined
        await user.save()

        return "Otp Doesnot match or expired"
    }

}
