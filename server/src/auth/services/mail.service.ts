import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';



@Injectable()
export class MailService {

    constructor(private readonly mailerService: MailerService) { }

    async sendActivationMail(email: string, link: string) {

        await this.mailerService.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Account activation on ${process.env.API_URL}`,
            text: '',
            html:
                `
                <div>
                    <h1>To activate your account click on the link:</h1>
                    <a href='${link}'>${link}</a>
                </div>

                `
        })

    }

}
