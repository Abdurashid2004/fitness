import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FitnessOrder } from './entities/fitness-order.entity';
import { CreateFitnessOrderDto } from './dto/create-fitness-order.dto';
import { UpdateFitnessOrderDto } from './dto/update-fitness-order.dto';
import { ClientService } from '../client/client.service';
import { CoachService } from '../coach/coach.service';
import { PaymentService } from '../payment/payment.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { FitnessOrderStatusService } from '../fitness-order-status/fitness-order-status.service';

@Injectable()
export class FitnessOrderService {
  constructor(
    @InjectModel(FitnessOrder)
    private readonly fitnessOrderRepo: typeof FitnessOrder,
    private readonly clientService: ClientService,
    private readonly coachService: CoachService,
    private readonly paymentService: PaymentService,
    private readonly subscriptionService: SubscriptionService,
    private readonly fitnessOrderStatusService: FitnessOrderStatusService,
  ) {}

  async create(createFitnessOrderDto: CreateFitnessOrderDto) {
    const fitnesORd = await this.fitnessOrderRepo.findOne({
      where: { name: createFitnessOrderDto.name },
    });
    if(fitnesORd){
      throw new BadRequestException('There is such FitnessOrder')
    }
    const client = await this.clientService.findOne(
      createFitnessOrderDto.clientId,
    );
    if (!client) throw new NotFoundException('Client No ID');

    const coach = await this.coachService.findOne(
      createFitnessOrderDto.coachId,
    );

    if (!coach) throw new NotFoundException('Coach No ID');

    const pament = await this.paymentService.findOne(
      createFitnessOrderDto.paymentId,
    );

    if (!pament) throw new NotFoundException('Payment No ID');

    const subs = await this.subscriptionService.findOne(
      createFitnessOrderDto.subscriptionId,
    );

    if (!subs) throw new NotFoundException('Subscription No ID');

    const fitnessOrderStatus = await this.fitnessOrderStatusService.findOne(
      createFitnessOrderDto.fitnessOrderstatusId,
    );

    if (!fitnessOrderStatus)
      throw new NotFoundException('fitnessOrderStatus No ID');

    return await this.fitnessOrderRepo.create(createFitnessOrderDto);
  }

  async findAll() {
    return await this.fitnessOrderRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const fitnessOrder = await this.fitnessOrderRepo.findByPk(id, {
      include: { all: true },
    });
    if (!fitnessOrder) {
      throw new NotFoundException(`Fitness order with id ${id} not found`);
    }
    return fitnessOrder;
  }

  async update(id: number, updateFitnessOrderDto: UpdateFitnessOrderDto) {
    const fitnessOrder = await this.fitnessOrderRepo.update(
      updateFitnessOrderDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (!fitnessOrder) {
      throw new NotFoundException(`Fitness order with id ${id} not found`);
    }
    return fitnessOrder[1][0];
  }

  async remove(id: number) {
    const fitnessOrder = await this.findOne(id);
    if (fitnessOrder) {
      return await fitnessOrder.destroy();
    } else {
      throw new NotFoundException(`Fitness order with id ${id} not found`);
    }
  }
}
