import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ClientDay } from '../../client-day/entities/client-day.entity';
import { CoachWorkingDay } from '../../coach-working-day/entities/coach-working-day.entity';

interface IWeekAttr {
  name: string;
}

@Table({ tableName: 'Week' })
export class Week extends Model<Week, IWeekAttr> {
  @ApiProperty({ example: 1, description: 'The unique identifier of the week' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Monday', description: 'The name of the week' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => ClientDay)
  clientDays: ClientDay[];

  @HasMany(() => CoachWorkingDay)
  coachWorkingDays: CoachWorkingDay[];
}
