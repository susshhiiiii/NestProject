import { HttpException, Injectable, PayloadTooLargeException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { LoginDto } from './dto/login.dto';
import { HashCompare } from 'src/helper/hashing.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }
    
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

        console.log(payload)
        const token = await this.jwtService.signAsync(payload)
        return {accessToken:token}
    }

}
