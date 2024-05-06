import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CoachFitness } from '../../coach-fitness/entities/coach-fitness.entity';

interface IFitnessTypeAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'Fitness-type' })
export class FitnessType extends Model<FitnessType, IFitnessTypeAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the fitness type',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Yoga',
    description: 'Name of the fitness type',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'A series of physical, mental, and spiritual practices',
    description: 'Description of the fitness type',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @HasMany(() => CoachFitness)
  coachFitnesses: CoachFitness;
}
