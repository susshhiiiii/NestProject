import { Body, Controller, Post, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/auth.decorator';
import { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { LoginViaOtpDto } from './dto/loginOtp.dto';
import { OtpRequestDto } from './dto/otpRequest.dto';
import { VerifyMail } from './dto/verifymail.dto';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @ApiOperation({summary:"API endpoint for Siginig the User"})
    @Post('login')
    async signIn(@Body() loginDto: LoginDto, @Req() req: Request) {
        // await this.authService.validateUser(loginDto, req);
        return this.authService.login(loginDto)
    }

    @ApiOperation({ summary: "Api endpoint to request for login via Otp without password" })
    @Post('login/otp-request')
    async signInOtprequest(@Body()request:OtpRequestDto) {
        return await this.authService.otpRequest(request.email)
    }

    @Public()
    @ApiOperation({ summary: 'Api endpoint to login with otp' })
    @Post('login/otp')
    async signinOtp(@Body()loginOtpDto:LoginViaOtpDto) {
        return this.authService.otpVerify(loginOtpDto)
    }

    @Public()
    @ApiOperation({ summary: 'Api endpoint to verify your email' })
    @Post('verify-mail/requestOtp')
    async verifyMailRequest(request: VerifyMail) {
        // return 
    }
}


// @UseGuards(AuthGuard)
//   @Get('profile')
//   getProfile(@Request() req) {
//     return req.user;
//   }

//this is how we can use it our controller
