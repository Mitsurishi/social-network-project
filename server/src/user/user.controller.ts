import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('/:userId')
    getUserById(@Param('userId') userId: number) {

        return this.userService.getUserById(userId);

    }

    @Get('/:userId/friends')
    getUserFriends(@Param('userId') userId: number) {

        return this.userService.getUserFriends(userId);

    }

    @Patch('/:userId/:friendId')
    addRemoveFriend(@Param('userId') userId: number, @Param('friendId') friendId: number) {

        return this.userService.addRemoveFriend(userId, friendId);

    }

    @Delete('/delete/:id')
    deleteUserById(@Param('id') id: string) {

        return this.userService.deleteUserById(+id);

    }

}
