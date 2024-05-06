import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FitnessOrderStatusService } from './fitness-order-status.service';
import { CreateFitnessOrderStatusDto } from './dto/create-fitness-order-status.dto';
import { UpdateFitnessOrderStatusDto } from './dto/update-fitness-order-status.dto';
import { FitnessOrderStatus } from './entities/fitness-order-status.entity';

@ApiTags('fitness-order-status')
@Controller('fitness-order-status')
export class FitnessOrderStatusController {
  constructor(
    private readonly fitnessOrderStatusService: FitnessOrderStatusService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Creates a new fitness order status',
    type: FitnessOrderStatus,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  create(@Body() createFitnessOrderStatusDto: CreateFitnessOrderStatusDto) {
    return this.fitnessOrderStatusService.create(createFitnessOrderStatusDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all fitness order statuses',
    type: [FitnessOrderStatus],
  })
  findAll() {
    return this.fitnessOrderStatusService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns a single fitness order status',
    type: FitnessOrderStatus,
  })
  findOne(@Param('id') id: string) {
    return this.fitnessOrderStatusService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Updates a fitness order status',
    type: FitnessOrderStatus,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  update(
    @Param('id') id: string,
    @Body() updateFitnessOrderStatusDto: UpdateFitnessOrderStatusDto,
  ) {
    return this.fitnessOrderStatusService.update(
      +id,
      updateFitnessOrderStatusDto,
    );
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Removes a fitness order status',
    type: FitnessOrderStatus,
  })
  remove(@Param('id') id: string) {
    return this.fitnessOrderStatusService.remove(+id);
  }
}
