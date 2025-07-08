import { HttpException, Injectable, PayloadTooLargeException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { LoginDto } from './dto/login.dto';
import { HashCompare } from 'src/helper/hashing.helper';
import { JwtService } from '@nestjs/jwt';
import { LoginLogService } from 'src/modules/login-logmodule/login-logmodule.service';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService,private loginLogService:LoginLogService) { }
    
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
        
        const validateUser=HashCompare(loginDto.password,user.password)
        
        if (!validateUser)
            throw new UnauthorizedException
        
        const payload = {
            sub: user._id,
            email: user.email,
            roles:user.roles    
        }

        
        const token = await this.jwtService.signAsync(payload)
        return {accessToken:token}
    }

}
