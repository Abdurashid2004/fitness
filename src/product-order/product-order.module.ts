import { Module } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { ProductOrderController } from './product-order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductOrder } from './entities/product-order.entity';
import { ClientModule } from '../client/client.module';
import { ProductOrderStatusModule } from '../product-order-status/product-order-status.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductOrder]),
    ClientModule,
    ProductOrderStatusModule,
  ],
  controllers: [ProductOrderController],
  providers: [ProductOrderService],
  exports: [ProductOrderService],
})
export class ProductOrderModule {}
