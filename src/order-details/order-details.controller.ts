import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';

@ApiTags('Order Details')
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order detail' })
  @ApiBody({ type: CreateOrderDetailDto })
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order details' })
  async findAll() {
    return this.orderDetailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single order detail by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the order detail',
    type: 'number',
  })
  async findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing order detail' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the order detail',
    type: 'number',
  })
  @ApiBody({ type: UpdateOrderDetailDto })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order detail by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the order detail',
    type: 'number',
  })
  async remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
