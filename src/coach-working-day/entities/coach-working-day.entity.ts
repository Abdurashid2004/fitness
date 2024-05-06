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
import { Week } from '../../weeks/entities/week.entity';

interface ICoachWorkingDayAttr {
  coachId: number;
  weekId: number;
  start_time: Date;
  end_time: Date;
}

@Table({ tableName: 'Coach_Working_Day' })
export class CoachWorkingDay extends Model<
  CoachWorkingDay,
  ICoachWorkingDayAttr
> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the coach working day',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the coach',
  })
  @ForeignKey(() => Coach)
  @Column({
    type: DataType.INTEGER,
  })
  coachId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the week',
  })
  @ForeignKey(() => Week)
  @Column({
    type: DataType.INTEGER,
  })
  weekId: number;

  @ApiProperty({
    example: '2024-05-03T09:00:00Z',
    description: 'Start time of the working day',
  })
  @Column({
    type: DataType.DATE,
  })
  start_time: Date;

  @ApiProperty({
    example: '2024-05-03T17:00:00Z',
    description: 'End time of the working day',
  })
  @Column({
    type: DataType.DATE,
  })
  end_time: Date;

  @BelongsTo(() => Coach)
  coachs: Coach;

  @BelongsTo(() => Week)
  weeks: Week;
}
