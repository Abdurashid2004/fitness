import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FitnessOrderStatus } from './entities/fitness-order-status.entity';
import { CreateFitnessOrderStatusDto } from './dto/create-fitness-order-status.dto';
import { UpdateFitnessOrderStatusDto } from './dto/update-fitness-order-status.dto';

@Injectable()
export class FitnessOrderStatusService {
  constructor(
    @InjectModel(FitnessOrderStatus)
    private readonly fitnessOrdStarepo: typeof FitnessOrderStatus,
  ) {}

  async create(createFitnessOrderStatusDto: CreateFitnessOrderStatusDto) {
    return await this.fitnessOrdStarepo.create(createFitnessOrderStatusDto);
  }

  async findAll() {
    return await this.fitnessOrdStarepo.findAll();
  }

  async findOne(id: number) {
    const fitnessOrderStatus = await this.fitnessOrdStarepo.findByPk(id);
    if (!fitnessOrderStatus) {
      throw new NotFoundException(
        `Fitness order status with id ${id} not found`,
      );
    }
    return fitnessOrderStatus;
  }

  async update(
    id: number,
    updateFitnessOrderStatusDto: UpdateFitnessOrderStatusDto,
  ) {
    const updatedPayment = await this.fitnessOrdStarepo.update(
      updateFitnessOrderStatusDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedPayment[1][0];
  }

  async remove(id: number) {
    const fitnessOrderStatus = await this.findOne(id);
    if (!fitnessOrderStatus) {
      throw new NotFoundException(
        `Fitness order status with id ${id} not found`,
      );
    }
    return await fitnessOrderStatus.destroy();
  }
}
