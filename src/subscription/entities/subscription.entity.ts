import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { FitnessOrder } from '../../fitness-order/entities/fitness-order.entity';

interface ISubscriptionAttr {
  name: string;
  price: number;
}

@Table({ tableName: 'Subscription' })
export class Subscription extends Model<Subscription, ISubscriptionAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the subscription',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Basic',
    description: 'Name of the subscription',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 10.99,
    description: 'Price of the subscription',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @HasMany(() => FitnessOrder)
  fitnessOrders: FitnessOrder[];
}
