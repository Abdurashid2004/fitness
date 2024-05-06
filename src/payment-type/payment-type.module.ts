import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { PaymentTypeController } from './payment-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentType } from './entities/payment-type.entity';

@Module({
  imports: [SequelizeModule.forFeature([PaymentType])],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
  exports: [PaymentTypeService],
})
export class PaymentTypeModule {}
