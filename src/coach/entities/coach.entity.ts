import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CoachWorkingDay } from '../../coach-working-day/entities/coach-working-day.entity';
import { CoachFitness } from '../../coach-fitness/entities/coach-fitness.entity';
import { FitnessOrder } from '../../fitness-order/entities/fitness-order.entity';
import { Week } from '../../weeks/entities/week.entity';
interface ICoachAttr {
  full_name: string;
  email: string;
  password: string;
  gender: string;
  birth_date: Date;
  photo: string;
  tg_link: string;
  phone: string;
  is_active: boolean;
  is_owner: boolean;
}

@Table({ tableName: 'Coach' })
export class Coach extends Model<Coach, ICoachAttr> {
  @ApiProperty({ example: '1', description: 'users ID unique number' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'patient full name' })
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
  password: string;

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

  @HasMany(() => CoachWorkingDay)
  coachWorkingDays: CoachWorkingDay[];

  @HasMany(() => CoachFitness)
  coachFitnesses: CoachFitness[];

  @HasMany(() => FitnessOrder)
  fitnessOrders: FitnessOrder[];

}
