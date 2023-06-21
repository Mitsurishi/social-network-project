import { Controller, Delete, Get, HttpStatus, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/models/user.model';

@UseGuards(JwtAccessGuard)
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('/users')
    async getAllUsers(@Req() request: Request): Promise<User[]> {

        const refreshToken = request.cookies.refreshToken;
        console.log(refreshToken);
        const users = await this.userService.getAllUsers();
        return users;

    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<User> {

        const user = await this.userService.getUserById(userId);
        return user;

    }

    @Get('/:userId/friends')
    async getUserFriends(@Param('userId') userId: number): Promise<number[]> {

        const friends = await this.userService.getUserFriends(userId);
        return friends;

    }

    @Patch('/:userId/:friendId')
    async addRemoveFriend(@Param('userId') userId: number, @Param('friendId') friendId: number): Promise<HttpStatus> {

        const result = await this.userService.addRemoveFriend(userId, friendId);
        return result;

    }

    @Delete('/delete/:id')
    async deleteUserById(@Param('id') id: string): Promise<number> {

        const result = await this.userService.deleteUserById(+id);
        return result;

    }

}
