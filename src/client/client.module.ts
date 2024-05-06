import { Logger, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../email/mail.module';
import { Client } from './entities/client.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Client]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [ClientController],
  providers: [ClientService, Logger],
  exports: [ClientService],
})
export class ClientModule {}
