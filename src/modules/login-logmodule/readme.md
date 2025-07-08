This is a plug-and-play Login Logging Module for NestJS that records every user login attempt (both successful and failed), capturing user ID, IP address, device info, and login status.

Logs both successful and failed login attempts

Records:

User ID

IP Address

Device/User-Agent

Login status (success or failed)

Timestamp (createdAt)

🔧 How to Integrate
Import LoginModule in AppModule
Import LoginModule in AuthModule
Inject LoginLogService into AuthService
Update Your validateUser() Method in AuthService

async validateUser(dto: LoginDto, req: Request): Promise<any> {
const { email, password } = dto;

        const ipAddress =
            (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
            req.socket?.remoteAddress ||
            'unknown';
        const userAgent = req.headers['user-agent'] || 'unknown';


        const user = await this.userService.findByEmail(email);


        if (!user) {
            await this.loginLogService.logLogin({
                userId: 'unknown',
                ipAddress,
                userAgent,
                status: StatusEnum.FAILED,
            });

            throw new UnauthorizedException('User not found');
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            await this.loginLogService.logLogin({
                userId: user._id.toString(),
                ipAddress,
                userAgent,
                status: StatusEnum.FAILED,
            });

            throw new UnauthorizedException('Invalid credentials');
        }


        await this.loginLogService.logLogin({
            userId: user._id.toString(),
            ipAddress,
            userAgent,
            status: StatusEnum.SUCCESS,
        });


        const { password: _, ...userWithoutPassword } = user.toObject?.() || user;
        return userWithoutPassword;
    }

Use in Login Controller call validate user
