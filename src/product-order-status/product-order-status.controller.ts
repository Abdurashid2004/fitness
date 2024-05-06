import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductOrderStatusService } from './product-order-status.service';
import { CreateProductOrderStatusDto } from './dto/create-product-order-status.dto';
import { UpdateProductOrderStatusDto } from './dto/update-product-order-status.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('product-order-status')
@Controller('product-order-status')
export class ProductOrderStatusController {
  constructor(
    private readonly productOrderStatusService: ProductOrderStatusService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The product order status has been successfully created.',
  })
  create(@Body() createProductOrderStatusDto: CreateProductOrderStatusDto) {
    return this.productOrderStatusService.create(createProductOrderStatusDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all product order statuses.',
  })
  findAll() {
    return this.productOrderStatusService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the product order status with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Product order status not found.' })
  findOne(@Param('id') id: string) {
    return this.productOrderStatusService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The product order status has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Product order status not found.' })
  update(
    @Param('id') id: string,
    @Body() updateProductOrderStatusDto: UpdateProductOrderStatusDto,
  ) {
    return this.productOrderStatusService.update(
      +id,
      updateProductOrderStatusDto,
    );
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The product order status has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product order status not found.' })
  remove(@Param('id') id: string) {
    return this.productOrderStatusService.remove(+id);
  }
}
