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
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CoachFitnessService } from './coach-fitness.service';
import { CoachFitness } from './entities/coach-fitness.entity';
import { CreateCoachFitnessDto } from './dto/create-coach-fitness.dto';
import { UpdateCoachFitnessDto } from './dto/update-coach-fitness.dto';



@ApiTags('Coach Fitness')
@Controller('coach-fitness')
export class CoachFitnessController {
  constructor(private readonly coachFitnessService: CoachFitnessService) {}

  @ApiOperation({ summary: 'Create a new coach fitness record' })
  @ApiResponse({
    status: 201,
    description: 'The coach fitness record has been successfully created',
    type: CoachFitness,
  })
  @ApiBody({ type: CreateCoachFitnessDto })
  @Post()
  create(@Body() createCoachFitnessDto: CreateCoachFitnessDto) {
    return this.coachFitnessService.create(createCoachFitnessDto);
  }

  @ApiOperation({ summary: 'Get all coach fitness records' })
  @ApiResponse({
    status: 200,
    description: 'Returns all coach fitness records',
    type: [CoachFitness],
  })
  @Get()
  findAll() {
    return this.coachFitnessService.findAll();
  }

  @ApiOperation({ summary: 'Get a coach fitness record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the coach fitness record',
    type: CoachFitness,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the coach fitness record',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachFitnessService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a coach fitness record by ID' })
  @ApiResponse({
    status: 200,
    description: 'The coach fitness record has been successfully updated',
    type: CoachFitness,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the coach fitness record',
  })
  @ApiBody({ type: UpdateCoachFitnessDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoachFitnessDto: UpdateCoachFitnessDto,
  ) {
    return this.coachFitnessService.update(+id, updateCoachFitnessDto);
  }

  @ApiOperation({ summary: 'Delete a coach fitness record by ID' })
  @ApiResponse({
    status: 200,
    description: 'The coach fitness record has been successfully deleted',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the coach fitness record',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachFitnessService.remove(+id);
  }
}
