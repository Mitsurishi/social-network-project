import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrationDto } from '../auth/dto/registration.dto';
import * as bcrypt from 'bcrypt';
import { FileService, FileType } from 'src/file/file.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {

    constructor(

        @InjectModel(User) private userRepository: typeof User,
        private fileService: FileService

    ) { }

    async createUser(registrationDto: RegistrationDto, profilePicture, activationLink: string): Promise<User> {

        try {
            const profilePicturePath = this.fileService.createFile(FileType.IMAGE, profilePicture);
            const hashPassword = await this.encryptPassword(registrationDto.password);
            const user = await this.userRepository.create({ ...registrationDto, password: hashPassword, activationLink: activationLink, profilePicturePath: profilePicturePath });
            return user;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

    }

    async getAllUsers(): Promise<User[]> {

        const users = this.userRepository.findAll();
        return users;

    }

    async getUserById(userId: number): Promise<User> {

        try {
            const user = await this.userRepository.findByPk(userId, { attributes: { exclude: ['password', 'email', 'isActivated', 'activationLink',] } });
            return user;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }

    async getUserFriends(userId: number): Promise<number[]> {

        try {
            const user = await this.userRepository.findByPk(userId, { attributes: ['friends'] });
            const result = user.friends;
            return result;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }

    async addRemoveFriend(userId: number, friendId: number): Promise<HttpStatus> {

        try {
            const user = await this.userRepository.findByPk(userId);
            const friend = await this.userRepository.findByPk(friendId);
            if (user.friends.includes(friendId)) {
                user.friends = user.friends.filter((userId) => userId !== friendId);
                friend.friends = friend.friends.filter((userId) => userId !== userId);
            } else {
                user.friends.push(friendId);
                friend.friends.push(userId);
            }
            await user.save();
            await friend.save();
            return HttpStatus.ACCEPTED;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

    }

    async deleteUserById(id: number): Promise<number> {
        try {
            const profilePicture = await this.userRepository.findOne({ where: { id: id }, attributes: { include: ['profilePicturePath'] } })
            this.fileService.deleteFile(profilePicture.profilePicturePath);
            return await this.userRepository.destroy({ where: { id: id } });
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    private async encryptPassword(password: string) {

        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);

    }

}
