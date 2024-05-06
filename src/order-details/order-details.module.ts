import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderDetail } from './entities/order-detail.entity';
import { ProductsModule } from '../products/products.module';
import { ProductOrderModule } from '../product-order/product-order.module';

@Module({
  imports: [
    SequelizeModule.forFeature([OrderDetail]),
    ProductsModule,
    ProductOrderModule,
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}
