import { Module } from '@nestjs/common';
import { CoachWorkingDayService } from './coach-working-day.service';
import { CoachWorkingDayController } from './coach-working-day.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoachWorkingDay } from './entities/coach-working-day.entity';
import { WeeksModule } from '../weeks/weeks.module';
import { CoachModule } from '../coach/coach.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([CoachWorkingDay]),
    JwtModule.register({}),
    WeeksModule,
    CoachModule,
  ],
  controllers: [CoachWorkingDayController],
  providers: [CoachWorkingDayService],
})
export class CoachWorkingDayModule {}
