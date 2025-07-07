import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from './guards/auth.guard';

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: JWT_KEY,
    signOptions:{expiresIn:'1h'}
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {

}
