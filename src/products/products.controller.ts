import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { ClientSelfGuard } from '../guards/client.self.guard';
import { ClientGuard } from '../guards/client.guard';
import { CoachGuard } from '../guards/coach.guard';
import { CoachSelfGuard } from '../guards/coach.self.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @UseGuards(AdminGuard)
  @Post()
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiResponse({ status: 200, description: 'Returns all products.' })
  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Returns all products.' })
  @UseGuards(CoachSelfGuard)
  @UseGuards(CoachGuard)
  @Get()
  findAllCoach() {
    return this.productsService.findAllCoach();
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the product with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', type: 'integer', description: 'Product ID' })
  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', type: 'integer', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiParam({ name: 'id', type: 'integer', description: 'Product ID' })
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
