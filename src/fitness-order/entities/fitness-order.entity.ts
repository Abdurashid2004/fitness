import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { FitnessOrderStatus } from '../../fitness-order-status/entities/fitness-order-status.entity';
import { Subscription } from '../../subscription/entities/subscription.entity';
import { Client } from '../../client/entities/client.entity';
import { Coach } from '../../coach/entities/coach.entity';
import { Payment } from '../../payment/entities/payment.entity';

interface IFitnessOrderAttr {
  name: string;
  paymentId: number;
  total_price: number;
  coachId: number;
  clientId: number;
  subscriptionId: number;
  fitnessOrderstatusId: number;
}

@Table({ tableName: 'fitnessOrder' })
export class FitnessOrder extends Model<FitnessOrder, IFitnessOrderAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the fitness order',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the fitness order',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the payment',
  })
  @ForeignKey(() => Payment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  paymentId: number;

  @ApiProperty({
    example: 100,
    description: 'Total price of the fitness order',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total_price: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the coach associated with the order',
  })
  @ForeignKey(() => Coach)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  coachId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the client associated with the order',
  })
  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clientId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the subscription associated with the order',
  })
  @ForeignKey(() => Subscription)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subscriptionId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the status of the order',
  })
  @ForeignKey(() => FitnessOrderStatus)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fitnessOrderstatusId: number;

  @BelongsTo(() => Payment)
  payments: Payment;

  @BelongsTo(() => Client)
  clients: Client;

  @BelongsTo(() => Coach)
  coachs: Coach;

  @BelongsTo(() => Subscription)
  subscriptions: Subscription;

  @BelongsTo(() => FitnessOrderStatus)
  fitnessOrderStatuses: FitnessOrderStatus;
}
