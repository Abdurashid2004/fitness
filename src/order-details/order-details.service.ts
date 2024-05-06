import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderDetail } from './entities/order-detail.entity';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { ProductsService } from '../products/products.service';
import { ProductOrderService } from '../product-order/product-order.service';
import { ApiQuery } from '@nestjs/swagger';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectModel(OrderDetail)
    private readonly orderDetailRepo: typeof OrderDetail,
    private readonly productService: ProductsService,
    private readonly prductOrderSrvice: ProductOrderService,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const product = await this.productService.findOne(
      createOrderDetailDto.productId,
    );
    if (!product) {
      throw new ForbiddenException('Product ID No');
    }

    const prodOrder = await this.prductOrderSrvice.findOne(
      createOrderDetailDto.product_orderId,
    );

    if (!prodOrder) {
      throw new ForbiddenException('ProductOrder ID No');
    }

    return this.orderDetailRepo.create(createOrderDetailDto);
  }

  async findAll() {
    return this.orderDetailRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.orderDetailRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    const orderDetail = await this.orderDetailRepo.findByPk(id);
    if (!orderDetail) {
      throw new Error(`Order detail with id ${id} not found`);
    }
    const updatedPayment = await this.orderDetailRepo.update(
      updateOrderDetailDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedPayment[1][0];
  }

  async remove(id: number) {
    const orderDetail = await this.orderDetailRepo.findByPk(id);
    if (!orderDetail) {
      throw new Error(`Order detail with id ${id} not found`);
    }
    return orderDetail.destroy();
  }
}
