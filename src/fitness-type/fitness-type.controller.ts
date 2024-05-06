import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
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
import { FitnessTypeService } from './fitness-type.service';
import { CreateFitnessTypeDto } from './dto/create-fitness-type.dto';
import { UpdateFitnessTypeDto } from './dto/update-fitness-type.dto';
import { FitnessType } from './entities/fitness-type.entity';
import { AdminGuard } from '../guards/admin.guard';
import { ClientSelfGuard } from '../guards/client.self.guard';
import { ClientGuard } from '../guards/client.guard';

@ApiTags('fitness-type')
@Controller('fitness-type')
export class FitnessTypeController {
  constructor(private readonly fitnessTypeService: FitnessTypeService) {}

  @ApiResponse({
    status: 201,
    description: 'Creates a new fitness type',
    type: FitnessType,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createFitnessTypeDto: CreateFitnessTypeDto) {
    return this.fitnessTypeService.create(createFitnessTypeDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Returns all fitness types',
    type: [FitnessType],
  })
  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  @Get()
  findAll() {
    return this.fitnessTypeService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a single fitness type',
    type: FitnessType,
  })
  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fitnessTypeService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Updates a fitness type',
    type: FitnessType,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFitnessTypeDto: UpdateFitnessTypeDto,
  ) {
    return this.fitnessTypeService.update(+id, updateFitnessTypeDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Removes a fitness type',
    type: FitnessType,
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fitnessTypeService.remove(+id);
  }
}
