import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

export enum FileType {

    IMAGE = 'image'

}

@Injectable()
export class FileService {

    createFile(type: FileType, file): string {

        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = uuid.v4() + '.' + fileExtension;
            const filePath = path.resolve(__dirname, '..', 'static', type);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
            return type + '/' + fileName;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    deleteFile(file: string) {
        try {
            const type = file.split('/').shift();
            const filePath = path.resolve(__dirname, '..', 'static', type);
            const fileName = file.split('/').pop();
            if (filePath && fileName) {
                fs.unlinkSync(path.resolve(filePath, fileName))
            }
            return { message: 'Picture not found' }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}