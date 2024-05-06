import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { FitnessOrder } from '../../fitness-order/entities/fitness-order.entity';

interface IFitnessOrderStatusAttr {
  name: string;
}

@Table({ tableName: 'Fitness-Order-status' })
export class FitnessOrderStatus extends Model<
  FitnessOrderStatus,
  IFitnessOrderStatusAttr
> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the fitness order status',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Pending',
    description: 'Name of the fitness order status',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => FitnessOrder)
  fitnessOrder: FitnessOrder;
}
