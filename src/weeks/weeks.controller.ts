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
import { WeeksService } from './weeks.service';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { ClientSelfGuard } from '../guards/client.self.guard';
import { ClientGuard } from '../guards/client.guard';
import { CoachSelfGuard } from '../guards/coach.self.guard';
import { CoachGuard } from '../guards/coach.guard';

@ApiTags('weeks')
@Controller('weeks')
export class WeeksController {
  constructor(private readonly weeksService: WeeksService) {}

  @ApiResponse({
    status: 201,
    description: 'The week has been successfully created.',
  })
  @Post()
  @UseGuards(AdminGuard)
  @ApiBody({ type: CreateWeekDto })
  create(@Body() createWeekDto: CreateWeekDto) {
    return this.weeksService.create(createWeekDto);
  }

  @ApiResponse({ status: 200, description: 'Returns all weeks.' })
  @Get()
  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  findAll() {
    return this.weeksService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Returns all weeks.' })
  @Get()
  @UseGuards(CoachSelfGuard)
  @UseGuards(CoachGuard)
  findAllCoach() {
    return this.weeksService.findAllCoach();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the week with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Week not found.' })
  @ApiParam({ name: 'id', type: 'integer', description: 'Week ID' })
  findOne(@Param('id') id: string) {
    return this.weeksService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'The week has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Week not found.' })
  @ApiParam({ name: 'id', type: 'integer', description: 'Week ID' })
  @ApiBody({ type: UpdateWeekDto })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeekDto: UpdateWeekDto) {
    return this.weeksService.update(+id, updateWeekDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The week has been successfully deleted.',
  })
  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 404, description: 'Week not found.' })
  @ApiParam({ name: 'id', type: 'integer', description: 'Week ID' })
  remove(@Param('id') id: string) {
    return this.weeksService.remove(+id);
  }
}
