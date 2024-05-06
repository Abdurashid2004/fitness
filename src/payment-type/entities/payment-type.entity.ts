import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IPaymentTypeAttr {
  name: string;
}

@Table({ tableName: 'Payment-type' })
export class PaymentType extends Model<PaymentType, IPaymentTypeAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the payment type',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Credit Card',
    description: 'Name of the payment type',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
