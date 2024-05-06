import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ClientDay } from '../../client-day/entities/client-day.entity';
import { FitnessOrder } from '../../fitness-order/entities/fitness-order.entity';
import { ProductOrder } from '../../product-order/entities/product-order.entity';

interface IPatientCreationAttr {
  full_name: string;
  phone: string;
  email: string;
  hashed_password: string;
  tg_link: string;
  photo: string;
  address: string;
  birth_date: Date;
}
@Table({ tableName: 'client' })
export class Client extends Model<Client, IPatientCreationAttr> {
  @ApiProperty({ example: '1', description: 'users ID unique number' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'patient full name' })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @ApiProperty({ example: '+123456789', description: 'patient phone number' })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'patient email address',
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({ example: 'hashedPassword', description: 'hashed password' })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({ example: 'hashedPassword', description: 'hashed password' })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: 'telegram.link/johndoe',
    description: 'Telegram link',
  })
  @Column({
    type: DataType.STRING,
  })
  tg_link: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'patient photo URL',
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({ example: 'Some Address', description: 'patient address' })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({ example: 'Some Address', description: 'patient address' })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_owner: boolean;

  @ApiProperty({ example: 'Some Address', description: 'patient address' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({ example: '1990-01-01', description: 'patient birth date' })
  @Column({
    type: DataType.DATE,
  })
  birth_date: Date;

  @ApiProperty({
    example: 'https://example.com/activation-link',
    description: 'activation link',
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(() => ClientDay)
  clientDays: ClientDay[];

  @HasMany(() => FitnessOrder)
  fitnessOrders: FitnessOrder[];

  @HasMany(() => ProductOrder)
  productOrders: ProductOrder[];
}
