import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { CoachModule } from './coach/coach.module';
import { WeeksModule } from './weeks/weeks.module';
import { CoachWorkingDayModule } from './coach-working-day/coach-working-day.module';
import { CoachFitnessModule } from './coach-fitness/coach-fitness.module';
import { FitnessTypeModule } from './fitness-type/fitness-type.module';
import { FitnessOrderModule } from './fitness-order/fitness-order.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ProductsModule } from './products/products.module';
import { ProductOrderModule } from './product-order/product-order.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { FitnessOrderStatusModule } from './fitness-order-status/fitness-order-status.module';
import { ProductOrderStatusModule } from './product-order-status/product-order-status.module';
import { ClientDayModule } from './client-day/client-day.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [__dirname + 'dist/**/*.entity{.ts,.js}'],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AdminModule,
    ClientModule,
    CoachModule,
    WeeksModule,
    CoachWorkingDayModule,
    CoachFitnessModule,
    FitnessTypeModule,
    FitnessOrderModule,
    PaymentModule,
    PaymentTypeModule,
    SubscriptionModule,
    ProductsModule,
    ProductOrderModule,
    OrderDetailsModule,
    FitnessOrderStatusModule,
    ProductOrderStatusModule,
    ClientDayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
