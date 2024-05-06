import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFitnessTypeDto } from './dto/create-fitness-type.dto';
import { UpdateFitnessTypeDto } from './dto/update-fitness-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FitnessType } from './entities/fitness-type.entity';

@Injectable()
export class FitnessTypeService {
  constructor(
    @InjectModel(FitnessType)
    private readonly fitnessTypeModel: typeof FitnessType,
  ) {}

  async create(createFitnessTypeDto: CreateFitnessTypeDto) {
    const fitType = await this.fitnessTypeModel.findOne({
      where: { name: createFitnessTypeDto.name },
    });
    if (fitType) throw new BadRequestException('These is such FitnessType');
    return await this.fitnessTypeModel.create(createFitnessTypeDto);
  }

  async findAll() {
    return await this.fitnessTypeModel.findAll();
  }

  async findOne(id: number) {
    const fitnessType = await this.fitnessTypeModel.findByPk(id);
    if (!fitnessType) {
      throw new NotFoundException(`These is Not such ${id}`);
    }
    return fitnessType;
  }

  async update(id: number, updateFitnessTypeDto: UpdateFitnessTypeDto) {
    const updatedPayment = await this.fitnessTypeModel.update(
      updateFitnessTypeDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (!updatedPayment) {
      throw new NotFoundException(`These is Not such ${id}`);
    }
    return updatedPayment[1][0];
  }

  async remove(id: number) {
    const fitnessType = await this.fitnessTypeModel.findByPk(id);
    if (!fitnessType) {
      throw new Error(`Fitness type with id ${id} not found`);
    }
    return await fitnessType.destroy();
  }
}
