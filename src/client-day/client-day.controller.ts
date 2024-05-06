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
import { ClientDayService } from './client-day.service';
import { CreateClientDayDto } from './dto/create-client-day.dto';
import { UpdateClientDayDto } from './dto/update-client-day.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ClientDay } from './entities/client-day.entity';
import { ClientSelfGuard } from '../guards/client.self.guard';
import { ClientGuard } from '../guards/client.guard';

@ApiTags('Client Day')
@Controller('client-day')
export class ClientDayController {
  constructor(private readonly clientDayService: ClientDayService) {}

  @ApiOperation({ summary: 'Create a new client day record' })
  @ApiBody({ type: CreateClientDayDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created',
    type: ClientDay,
  })
  @Post()
  create(@Body() createClientDayDto: CreateClientDayDto) {
    return this.clientDayService.create(createClientDayDto);
  }

  @ApiOperation({ summary: 'Get all client day records' })
  @ApiResponse({
    status: 200,
    description: 'List of all client day records',
    type: [ClientDay],
  })
  @Get()
  findAll() {
    return this.clientDayService.findAll();
  }

  @ApiOperation({ summary: 'Get a client day record by ID' })
  @ApiParam({ name: 'id', description: 'Client day ID' })
  @ApiResponse({
    status: 200,
    description: 'The client day record',
    type: ClientDay,
  })
  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientDayService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a client day record by ID' })
  @ApiParam({ name: 'id', description: 'Client day ID' })
  @ApiBody({ type: UpdateClientDayDto })
  @ApiResponse({
    status: 200,
    description: 'The updated client day record',
    type: ClientDay,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDayDto: UpdateClientDayDto,
  ) {
    return this.clientDayService.update(+id, updateClientDayDto);
  }

  @ApiOperation({ summary: 'Delete a client day record by ID' })
  @ApiParam({ name: 'id', description: 'Client day ID' })
  @ApiResponse({
    status: 200,
    description: 'The client day record has been deleted',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientDayService.remove(+id);
  }
}
