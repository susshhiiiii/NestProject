import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/auth.decorator';
import { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Public()
    @ApiOperation({summary:"API endpoint for Siginig the User"})
    @Post('login')
    async signIn(@Body() loginDto: LoginDto, @Req() req: Request) {
        // await this.authService.validateUser(loginDto, req);
        return this.authService.login(loginDto)
    }

}


// @UseGuards(AuthGuard)
//   @Get('profile')
//   getProfile(@Request() req) {
//     return req.user;
//   }

//this is how we can use it our controller
