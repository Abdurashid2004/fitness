import { Module } from '@nestjs/common';
import { ProductOrderStatusService } from './product-order-status.service';
import { ProductOrderStatusController } from './product-order-status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductOrderStatus } from './entities/product-order-status.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductOrderStatus])],
  controllers: [ProductOrderStatusController],
  providers: [ProductOrderStatusService],
  exports: [ProductOrderStatusService],
})
export class ProductOrderStatusModule {}
