import { Module } from '@nestjs/common';
import { CoachFitnessService } from './coach-fitness.service';
import { CoachFitnessController } from './coach-fitness.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoachFitness } from './entities/coach-fitness.entity';
import { CoachModule } from '../coach/coach.module';
import { FitnessTypeModule } from '../fitness-type/fitness-type.module';

@Module({
  imports: [
    SequelizeModule.forFeature([CoachFitness]),
    CoachModule,
    FitnessTypeModule,
  ],
  controllers: [CoachFitnessController],
  providers: [CoachFitnessService],
})
export class CoachFitnessModule {}
