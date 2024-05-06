import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ProductOrder } from '../../product-order/entities/product-order.entity';

interface IProductOrderStatusAttr {
  name: string;
}

@Table({ tableName: 'Product-Order-Status' })
export class ProductOrderStatus extends Model<
  ProductOrderStatus,
  IProductOrderStatusAttr
> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the product order status',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Processing',
    description: 'Name of the product order status',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => ProductOrder)
  productOrders: ProductOrder;
}
