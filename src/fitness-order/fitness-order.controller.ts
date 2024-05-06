import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FitnessOrderService } from './fitness-order.service';
import { CreateFitnessOrderDto } from './dto/create-fitness-order.dto';
import { UpdateFitnessOrderDto } from './dto/update-fitness-order.dto';
import { FitnessOrder } from './entities/fitness-order.entity';

@ApiTags('Fitness Order')
@Controller('fitness-order')
export class FitnessOrderController {
  constructor(private readonly fitnessOrderService: FitnessOrderService) {}

  @ApiOperation({ summary: 'Create a new fitness order' })
  @ApiResponse({
    status: 201,
    description: 'The fitness order has been successfully created',
    type: FitnessOrder,
  })
  @ApiBody({ type: CreateFitnessOrderDto })
  @Post()
  create(@Body() createFitnessOrderDto: CreateFitnessOrderDto) {
    return this.fitnessOrderService.create(createFitnessOrderDto);
  }

  @ApiOperation({ summary: 'Get all fitness orders' })
  @ApiResponse({
    status: 200,
    description: 'Returns all fitness orders',
    type: [FitnessOrder],
  })
  @Get()
  findAll() {
    return this.fitnessOrderService.findAll();
  }

  @ApiOperation({ summary: 'Get a fitness order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the fitness order',
    type: FitnessOrder,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the fitness order',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fitnessOrderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a fitness order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The fitness order has been successfully updated',
    type: FitnessOrder,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the fitness order',
  })
  @ApiBody({ type: UpdateFitnessOrderDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFitnessOrderDto: UpdateFitnessOrderDto,
  ) {
    return this.fitnessOrderService.update(+id, updateFitnessOrderDto);
  }

  @ApiOperation({ summary: 'Delete a fitness order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The fitness order has been successfully deleted',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the fitness order',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fitnessOrderService.remove(+id);
  }
}
