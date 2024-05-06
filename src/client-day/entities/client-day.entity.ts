import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from '../../client/entities/client.entity';
import { Week } from '../../weeks/entities/week.entity';

interface IClientDayAttr {
  clientId: number;
  weekId: number;
  start_time: Date;
  end_time: Date;
}

@Table({ tableName: 'Client-day' })
export class ClientDay extends Model<ClientDay, IClientDayAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the client day record',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Unique identifier of the client' })
  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clientId: number;

  @ApiProperty({ example: 1, description: 'Unique identifier of the week' })
  @ForeignKey(() => Week)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  weekId: number;

  @ApiProperty({
    example: '2024-05-04T08:00:00Z',
    description: 'Start time of the client day',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_time: Date;

  @ApiProperty({
    example: '2024-05-04T17:00:00Z',
    description: 'End time of the client day',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_time: Date;

  @BelongsTo(() => Client)
  clients: Client;

  @BelongsTo(() => Week)
  weeks: Week;
}
