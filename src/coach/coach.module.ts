import { Logger, Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Coach } from './entities/coach.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Coach]), JwtModule.register({})],
  controllers: [CoachController],
  providers: [CoachService, Logger],
  exports: [CoachService],
})
export class CoachModule {}
