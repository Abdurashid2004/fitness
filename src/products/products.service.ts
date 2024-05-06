import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productRepo: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepo.create(createProductDto);
    const product = await this.productRepo.findOne({
      where: { name: createProductDto.name },
    });
    if (product) {
      throw new BadRequestException('These is such product');
    }
    return newProduct;
  }

  async findAll() {
    const products = await this.productRepo.findAll();
    return products;
  }

  async findAllCoach() {
    const products = await this.productRepo.findAll();
    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepo.findByPk(id);
    if (!product) {
      throw new NotFoundException(`These is Not such ${id}`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productRepo.update(updateProductDto, {
      where: { id },
      returning: true,
    });
    if (!updatedProduct) {
      throw new NotFoundException(`These is Not such ${id}`);
    }
    return updatedProduct[1][0];
  }

  async remove(id: number) {
    const deletedProduct = await this.productRepo.destroy({ where: { id } });
    if (!deletedProduct) {
      throw new NotFoundException(`These is Not such ${id}`);
    }
    return deletedProduct;
  }
}
