import { Module } from '@nestjs/common';
import { FitnessOrderService } from './fitness-order.service';
import { FitnessOrderController } from './fitness-order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FitnessOrder } from './entities/fitness-order.entity';
import { ClientModule } from '../client/client.module';
import { CoachModule } from '../coach/coach.module';
import { PaymentModule } from '../payment/payment.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { FitnessOrderStatusModule } from '../fitness-order-status/fitness-order-status.module';

@Module({
  imports: [
    SequelizeModule.forFeature([FitnessOrder]),
    ClientModule,
    CoachModule,
    PaymentModule,
    SubscriptionModule,
    FitnessOrderStatusModule,
  ],
  controllers: [FitnessOrderController],
  providers: [FitnessOrderService],
})
export class FitnessOrderModule {}
