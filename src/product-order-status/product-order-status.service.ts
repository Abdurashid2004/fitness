import { Injectable } from '@nestjs/common';
import { CreateProductOrderStatusDto } from './dto/create-product-order-status.dto';
import { UpdateProductOrderStatusDto } from './dto/update-product-order-status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductOrderStatus } from './entities/product-order-status.entity';

@Injectable()
export class ProductOrderStatusService {
  constructor(
    @InjectModel(ProductOrderStatus)
    private readonly productOrderStaRepo: typeof ProductOrderStatus,
  ) {}

  async create(createProductOrderStatusDto: CreateProductOrderStatusDto) {
    const newProductOrderStatus = await this.productOrderStaRepo.create(
      createProductOrderStatusDto,
    );
    return newProductOrderStatus;
  }

  async findAll() {
    const productOrderStatuses = await this.productOrderStaRepo.findAll();
    return productOrderStatuses;
  }

  async findOne(id: number) {
    const productOrderStatus = await this.productOrderStaRepo.findByPk(id);
    return productOrderStatus;
  }

  async update(
    id: number,
    updateProductOrderStatusDto: UpdateProductOrderStatusDto,
  ) {
    const updatedProductOrderStatus = await this.productOrderStaRepo.update(
      updateProductOrderStatusDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedProductOrderStatus[1][0];
  }

  async remove(id: number) {
    const deletedProductOrderStatus = await this.productOrderStaRepo.destroy({
      where: { id },
    });
    return deletedProductOrderStatus;
  }
}
