import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coach } from '../../coach/entities/coach.entity';
import { FitnessType } from '../../fitness-type/entities/fitness-type.entity';

interface ICoachFitnessAttr {
  coachId: number;
  fitnessTypeId: number;
  price: number;
}

@Table({ tableName: 'Coach-fitness' })
export class CoachFitness extends Model<CoachFitness, ICoachFitnessAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the coach fitness record',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Unique identifier for the coach' })
  @ForeignKey(() => Coach)
  @Column({
    type: DataType.INTEGER,
  })
  coachId: number;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the fitness type',
  })
  @ForeignKey(() => FitnessType)
  @Column({
    type: DataType.INTEGER,
  })
  fitnessTypeId: number;

  @ApiProperty({
    example: 100.0,
    description: 'Price for the coach fitness service',
  })
  @Column({
    type: DataType.DECIMAL,
  })
  price: number;

  @BelongsTo(() => Coach)
  coacha: Coach;

  @BelongsTo(() => FitnessType)
  fitnessType: FitnessType;
}
