import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './userDtos/Create.dto';
import { UpdateUserDto } from './userDtos/Update.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
@Roles(Role.User)
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Public()
    @Post('register')
    @ApiOperation({summary:'Api endpoint to add User'})
    async CreateUser(@Body() userRequest: CreateUserDto) {
        return await this.userService.CreateUser(userRequest)
    }

    @Get()
    @ApiOperation({summary:'Api endpoint to Get all Users'})
    async GetUsers() {
        return await this.userService.GetAllUser()
    }

    @Get(':id')
    @ApiOperation({summary:'Api endpoint to Get User with a given id'})
    async GetUser(@Param('id') id: string) {
        return await this.userService.GetUser(id)
    }

    @Delete(':id')
    @ApiOperation({summary:'Api endpoint to Delete User with a given id'})
    async DeleteUser(@Param('id') id: string) {
        return await this.userService.DeleteUser(id)
    }

    @Put()
    @ApiOperation({summary:'Api endpoint to update User'})
    UpdateUser(@Body() updateRequest:UpdateUserDto ) {
        return this.userService.Update(updateRequest)
    }

}
