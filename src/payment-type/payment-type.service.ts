import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentType } from './entities/payment-type.entity';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectModel(PaymentType)
    private readonly paymentTypeRepo: typeof PaymentType,
  ) {}

  async create(createPaymentTypeDto: CreatePaymentTypeDto) {
    const newPaymentType =
      await this.paymentTypeRepo.create(createPaymentTypeDto);
    return newPaymentType;
  }

  async findAll() {
    const paymentTypes = await this.paymentTypeRepo.findAll();
    return paymentTypes;
  }

  async findOne(id: number) {
    const paymentType = await this.paymentTypeRepo.findByPk(id);
    if (!paymentType) {
      throw new NotFoundException(`Payment type with id ${id} not found`);
    }
    return paymentType;
  }

  async update(id: number, updatePaymentTypeDto: UpdatePaymentTypeDto) {
    const updatedPayment = await this.paymentTypeRepo.update(
      updatePaymentTypeDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedPayment[1][0];
  }

  async remove(id: number) {
    const paymentType = await this.findOne(id);
    await paymentType.destroy();
    return `Payment type with id ${id} has been deleted`;
  }
}
