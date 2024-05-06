import { Module } from '@nestjs/common';
import { FitnessTypeService } from './fitness-type.service';
import { FitnessTypeController } from './fitness-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FitnessType } from './entities/fitness-type.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([FitnessType]), JwtModule.register({})],
  controllers: [FitnessTypeController],
  providers: [FitnessTypeService],
  exports: [FitnessTypeService],
})
export class FitnessTypeModule {}
