import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { PaymentType } from '../../payment-type/entities/payment-type.entity';
import { FitnessOrder } from '../../fitness-order/entities/fitness-order.entity';

interface IPaymentAttr {
  paymentTypeId: number;
  is_paid: boolean;
  start_date: Date;
  end_date: Date;
  amount: number;
}

@Table({ tableName: 'Payment' })
export class Payment extends Model<Payment, IPaymentAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the payment',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the payment type',
  })
  @ForeignKey(() => PaymentType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'paymentTypeId', // Corrected field name
  })
  paymentTypeId: number;

  @ApiProperty({
    example: true,
    description: 'Flag indicating whether the payment is paid',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_paid: boolean;

  @ApiProperty({
    example: '2024-05-03T00:00:00Z',
    description: 'Start date of the payment period',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: Date;

  @ApiProperty({
    example: '2024-06-03T00:00:00Z',
    description: 'End date of the payment period',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: Date;

  @ApiProperty({
    example: 100,
    description: 'Amount of the payment',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @BelongsTo(() => PaymentType)
  paymentTypes: PaymentType;

  @HasMany(() => FitnessOrder)
  fitnessOrders: FitnessOrder[];
}
