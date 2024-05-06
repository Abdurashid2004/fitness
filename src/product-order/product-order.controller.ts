import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('product-order')
@Controller('product-order')
export class ProductOrderController {
  constructor(private readonly productOrderService: ProductOrderService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The product order has been successfully created.',
  })
  create(@Body() createProductOrderDto: CreateProductOrderDto) {
    return this.productOrderService.create(createProductOrderDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all product orders.' })
  findAll() {
    return this.productOrderService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the product order with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Product order not found.' })
  findOne(@Param('id') id: string) {
    return this.productOrderService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The product order has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Product order not found.' })
  update(
    @Param('id') id: string,
    @Body() updateProductOrderDto: UpdateProductOrderDto,
  ) {
    return this.productOrderService.update(+id, updateProductOrderDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The product order has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product order not found.' })
  remove(@Param('id') id: string) {
    return this.productOrderService.remove(+id);
  }
}
