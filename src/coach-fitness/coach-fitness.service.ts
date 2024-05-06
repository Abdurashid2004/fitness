import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCoachFitnessDto } from './dto/create-coach-fitness.dto';
import { UpdateCoachFitnessDto } from './dto/update-coach-fitness.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CoachFitness } from './entities/coach-fitness.entity';
import { CoachService } from '../coach/coach.service';
import { FitnessTypeService } from '../fitness-type/fitness-type.service';

@Injectable()
export class CoachFitnessService {
  constructor(
    @InjectModel(CoachFitness)
    private readonly coachFitnessRepo: typeof CoachFitness,
    private readonly coachService: CoachService,
    private readonly fitnessTypeService: FitnessTypeService,
  ) {}

  async create(createCoachFitnessDto: CreateCoachFitnessDto) {
    const coach = await this.coachService.findOne(
      createCoachFitnessDto.coachId,
    );
    if (!coach) {
      throw new ForbiddenException("Coach ID yo'q");
    }

    const fitnessType = await this.fitnessTypeService.findOne(
      createCoachFitnessDto.fitnessTypeId,
    );

    if (!fitnessType) {
      throw new ForbiddenException("fitnessType ID yo'q");
    }

    return await this.coachFitnessRepo.create(createCoachFitnessDto);
  }

  async findAll() {
    return await this.coachFitnessRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const coachFitness = await this.coachFitnessRepo.findByPk(id, {
      include: { all: true },
    });
    if (!coachFitness) {
      throw new NotFoundException(`Coach fitness with id ${id} not found`);
    }
    return coachFitness;
  }

  async update(id: number, updateCoachFitnessDto: UpdateCoachFitnessDto) {
    const coachFit = await this.coachFitnessRepo.update(updateCoachFitnessDto, {
      where: { id },
      returning: true,
    });
    if (coachFit) {
      throw new BadRequestException(
        `There is no CoachFitness with such an ${id}`,
      );
    }

    return coachFit[1][0];
  }

  async remove(id: number) {
    const coachFitness = await this.findOne(id);
    if (coachFitness) {
      throw new BadRequestException(
        `There is no CoachFitness with such an ${id}`,
      );
    }
    return coachFitness;
  }
}
