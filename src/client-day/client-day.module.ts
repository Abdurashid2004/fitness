import { Module } from '@nestjs/common';
import { ClientDayService } from './client-day.service';
import { ClientDayController } from './client-day.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientDay } from './entities/client-day.entity';
import { WeeksModule } from '../weeks/weeks.module';
import { ClientModule } from '../client/client.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([ClientDay]),
    JwtModule.register({}),
    WeeksModule,
    ClientModule,
  ],
  controllers: [ClientDayController],
  providers: [ClientDayService],
})
export class ClientDayModule {}
