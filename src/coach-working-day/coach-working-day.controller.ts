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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CoachWorkingDayService } from './coach-working-day.service';
import { CreateCoachWorkingDayDto } from './dto/create-coach-working-day.dto';
import { UpdateCoachWorkingDayDto } from './dto/update-coach-working-day.dto';
import { CoachWorkingDay } from './entities/coach-working-day.entity';
import { CoachSelfGuard } from '../guards/coach.self.guard';
import { CoachGuard } from '../guards/coach.guard';

@ApiTags('Coach Working Day')
@Controller('coach-working-day')
export class CoachWorkingDayController {
  constructor(
    private readonly coachWorkingDayService: CoachWorkingDayService,
  ) {}

  @ApiOperation({ summary: 'Create a new coach working day' })
  @ApiResponse({
    status: 201,
    description: 'The coach working day has been successfully created',
    type: CoachWorkingDay,
  })
  @ApiBody({ type: CreateCoachWorkingDayDto })
  @Post()
  create(@Body() createCoachWorkingDayDto: CreateCoachWorkingDayDto) {
    return this.coachWorkingDayService.create(createCoachWorkingDayDto);
  }

  @ApiOperation({ summary: 'Get all coach working days' })
  @ApiResponse({
    status: 200,
    description: 'Returns all coach working days',
    type: [CoachWorkingDay],
  })
  @Get()
  findAll() {
    return this.coachWorkingDayService.findAll();
  }

  @ApiOperation({ summary: 'Get a coach working day by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the coach working day',
    type: CoachWorkingDay,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the coach working day',
  })
  @UseGuards(CoachSelfGuard)
  @UseGuards(CoachGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachWorkingDayService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a coach working day by ID' })
  @ApiResponse({
    status: 200,
    description: 'The coach working day has been successfully updated',
    type: CoachWorkingDay,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the coach working day',
  })
  @ApiBody({ type: UpdateCoachWorkingDayDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoachWorkingDayDto: UpdateCoachWorkingDayDto,
  ) {
    return this.coachWorkingDayService.update(+id, updateCoachWorkingDayDto);
  }

  @ApiOperation({ summary: 'Delete a coach working day by ID' })
  @ApiResponse({
    status: 200,
    description: 'The coach working day has been successfully deleted',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the coach working day',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachWorkingDayService.remove(+id);
  }
}
