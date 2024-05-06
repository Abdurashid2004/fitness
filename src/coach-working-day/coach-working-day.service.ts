import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CoachWorkingDay } from './entities/coach-working-day.entity';
import { CreateCoachWorkingDayDto } from './dto/create-coach-working-day.dto';
import { UpdateCoachWorkingDayDto } from './dto/update-coach-working-day.dto';
import { WeeksService } from '../weeks/weeks.service';
import { CoachService } from '../coach/coach.service';

@Injectable()
export class CoachWorkingDayService {
  constructor(
    @InjectModel(CoachWorkingDay)
    private readonly coachWorkingRepo: typeof CoachWorkingDay,
    private readonly weekService: WeeksService,
    private readonly coachService: CoachService,
  ) {}

  async create(createCoachWorkingDayDto: CreateCoachWorkingDayDto) {
    const weeks = await this.weekService.findOne(
      createCoachWorkingDayDto.weekId,
    );
    if (!weeks) {
      throw new BadRequestException('ID No');
    }

    const coachs = await this.coachService.findOne(
      createCoachWorkingDayDto.coachId,
    );

    if (!coachs) {
      throw new BadRequestException('ID No');
    }

    return await this.coachWorkingRepo.create(createCoachWorkingDayDto);
  }

  async findAll() {
    return await this.coachWorkingRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const coachWorkingDay = await this.coachWorkingRepo.findByPk(id, {
      include: { all: true },
    });
    if (!coachWorkingDay) {
      throw new NotFoundException(`Coach working day with id ${id} not found`);
    }
    return coachWorkingDay;
  }

  async update(id: number, updateCoachWorkingDayDto: UpdateCoachWorkingDayDto) {
    const coachFit = await this.coachWorkingRepo.update(
      updateCoachWorkingDayDto,
      {
        where: { id },
        returning: true,
      },
    );
    return coachFit[1][0];
  }

  async remove(id: number) {
    const coachWorkingDay = await this.findOne(id);
    return await coachWorkingDay.destroy();
  }
}
