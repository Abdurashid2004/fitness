import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductOrder } from './entities/product-order.entity';
import { ClientService } from '../client/client.service';
import { ProductOrderStatusService } from '../product-order-status/product-order-status.service';

@Injectable()
export class ProductOrderService {
  constructor(
    @InjectModel(ProductOrder)
    private readonly productOrderRepo: typeof ProductOrder,
    private readonly clientService: ClientService,
    private readonly productOrderStatusService: ProductOrderStatusService,
  ) {}

  async create(createProductOrderDto: CreateProductOrderDto) {
    const newProductOrder = await this.productOrderRepo.create(
      createProductOrderDto,
    );
    const client = await this.clientService.findOne(
      createProductOrderDto.clientId,
    );

    if (!client) {
      throw new ForbiddenException('Client Id No');
    }

    const pordStatus = await this.productOrderStatusService.findOne(
      createProductOrderDto.productOrderStatusId,
    );

    if (!pordStatus) {
      throw new ForbiddenException('productOrderStatus Id No');
    }

    return newProductOrder;
  }

  async findAll() {
    const productOrders = await this.productOrderRepo.findAll({
      include: { all: true },
    });
    return productOrders;
  }

  async findOne(id: number) {
    const productOrder = await this.productOrderRepo.findByPk(id, {
      include: { all: true },
    });
    return productOrder;
  }

  async update(id: number, updateProductOrderDto: UpdateProductOrderDto) {
    const updatedProductOrder = await this.productOrderRepo.update(
      updateProductOrderDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedProductOrder[1][0];
  }

  async remove(id: number) {
    const deletedProductOrder = await this.productOrderRepo.destroy({
      where: { id },
    });
    return deletedProductOrder;
  }
}
