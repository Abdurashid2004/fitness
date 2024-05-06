import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { PaymentTypeService } from '../payment-type/payment-type.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private readonly paymentRepo: typeof Payment,
    private readonly paymentTypeService: PaymentTypeService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const newPayment = await this.paymentRepo.create(createPaymentDto);
    const paymentTypes = await this.paymentTypeService.findOne(
      createPaymentDto.paymentTypeId,
    );
    if (!paymentTypes) {
      throw new ForbiddenException('paymentType No ID');
    }
    return newPayment;
  }

  async findAll() {
    const payments = await this.paymentRepo.findAll({ include: { all: true } });
    return payments;
  }

  async findOne(id: number) {
    const payment = await this.paymentRepo.findByPk(id, {
      include: { all: true },
    });
    if (!payment) {
      throw new NotFoundException(`These is Not such ${id}`);
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const updatedPayment = await this.paymentRepo.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });
    if (!updatedPayment) {
      throw new NotFoundException(`These is Not such ${id}`);
    }
    return updatedPayment[1][0];
  }

  async remove(id: number) {
    const deletedPayment = await this.paymentRepo.destroy({ where: { id } });
    if (!deletedPayment) {
      throw new NotFoundException(`These is Not such ${id}`);
    }
    return deletedPayment;
  }

  // async findByIdOrFail(id: number) {
  //   const payment = await this.paymentRepo.findByPk(id);
  //   if (!payment) {
  //     throw new Error(`Payment with ID ${id} not found`);
  //   }
  //   return payment;
  // }
}
