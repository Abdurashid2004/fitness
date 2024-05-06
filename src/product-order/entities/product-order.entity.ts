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
import { ProductOrderStatus } from '../../product-order-status/entities/product-order-status.entity';
import { Client } from '../../client/entities/client.entity';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';

interface IProductOrderAttr {
  clientId: number;
  productOrderStatusId: number;
}

@Table({ tableName: 'Product-Order' })
export class ProductOrder extends Model<ProductOrder, IProductOrderAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the product order',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Client ID associated with the product order',
  })
  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clientId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the status of the product order',
  })
  @ForeignKey(() => ProductOrderStatus)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'productOrderStatusId',
  })
  productOrderStatusId: number;

  @BelongsTo(() => Client)
  cliets: Client;

  @BelongsTo(() => ProductOrderStatus)
  productOrderStatus: ProductOrderStatus;

  @HasMany(() => OrderDetail)
  orderDetails: OrderDetail[];
}
