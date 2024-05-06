import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Client } from '../client/entities/client.entity';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(client: Client) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/client/activate/${client.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: client.email,
      subject: 'Welcome to stadium App! Confirmation your email',
      template: './confirmation',
      context: {
        name: client.full_name,
        url,
      },
    });
  }
} 
