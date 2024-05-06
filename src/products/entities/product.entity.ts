import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';

interface IProductAttr {
  name: string;
  price: number;
  description: string;
  photo: string;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, IProductAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the product',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Product Name',
    description: 'Name of the product',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 10.99,
    description: 'Price of the product',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: 'Product Description',
    description: 'Description of the product',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 'product.jpg',
    description: 'Photo URL of the product',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  photo: string;

  @HasMany(() => OrderDetail)
  orderDetails: OrderDetail[];
}
