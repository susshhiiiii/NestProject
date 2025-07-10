import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from './guards/auth.guard';
import { LoginModule } from 'src/modules/login-logmodule/login-logmodule.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    UserModule, JwtModule.register({
    global: true,
    secret: JWT_KEY,
    signOptions:{expiresIn:'1h'}
  }),LoginModule,EmailModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {
  
}
