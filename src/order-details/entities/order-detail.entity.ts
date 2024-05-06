import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductOrder } from '../../product-order/entities/product-order.entity';
import { Product } from '../../products/entities/product.entity';

interface IOrderDetailAttr {
  productId: number;
  product_orderId: number;
}

@Table({ tableName: 'Order-details' })
export class OrderDetail extends Model<OrderDetail, IOrderDetailAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the order detail',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the product',
  })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the order to which this detail belongs',
  })
  @ForeignKey(() => ProductOrder)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'product_orderId', // Corrected field name
  })
  product_orderId: number;

  @BelongsTo(() => Product)
  products: Product;

  @BelongsTo(() => ProductOrder)
  productOrders: ProductOrder;
}
