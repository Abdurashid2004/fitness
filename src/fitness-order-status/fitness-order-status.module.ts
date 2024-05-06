import { Module } from '@nestjs/common';
import { FitnessOrderStatusService } from './fitness-order-status.service';
import { FitnessOrderStatusController } from './fitness-order-status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FitnessOrderStatus } from './entities/fitness-order-status.entity';

@Module({
  imports: [SequelizeModule.forFeature([FitnessOrderStatus])],
  controllers: [FitnessOrderStatusController],
  providers: [FitnessOrderStatusService],
  exports: [FitnessOrderStatusService],
})
export class FitnessOrderStatusModule {}
