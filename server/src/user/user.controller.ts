import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number) {

        return this.userService.getUserById(userId);

    }

    @Get('/:userId/friends')
    async getUserFriends(@Param('userId') userId: number) {

        return this.userService.getUserFriends(userId);

    }

    @Patch('/:userId/:friendId')
    async addRemoveFriend(@Param('userId') userId: number, @Param('friendId') friendId: number) {

        return this.userService.addRemoveFriend(userId, friendId);

    }

    @Delete('/delete/:id')
    async deleteUserById(@Param('id') id: string) {

        return this.userService.deleteUserById(+id);

    }

}