import { Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAccessGuard)
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('/users')
    async getAllUsers() {

        const users = await this.userService.getAllUsers();
        return users;

    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number) {

        const user = await this.userService.getUserById(userId);
        return user;

    }

    @Get('/:userId/friends')
    async getUserFriends(@Param('userId') userId: number) {

        const friends = await this.userService.getUserFriends(userId);
        return friends;

    }

    @Patch('/:userId/:friendId')
    async addRemoveFriend(@Param('userId') userId: number, @Param('friendId') friendId: number) {

        const result = await this.userService.addRemoveFriend(userId, friendId);
        return result;

    }

    @Delete('/delete/:id')
    async deleteUserById(@Param('id') id: string) {

        const result = await this.userService.deleteUserById(+id);
        return result;

    }

}
