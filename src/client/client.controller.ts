import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Client } from './entities/client.entity';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { LoginClientDto } from './dto/login-patient.dto';
import { CookieGetter } from '../decorators/cookie_getter.decorators';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientSelfGuard } from '../guards/client.self.guard';
import { ClientGuard } from '../guards/client.guard';
import { AdminGuard } from '../guards/admin.guard';
import { CoachGuard } from '../guards/coach.guard';
import { CoachSelfGuard } from '../guards/coach.self.guard';

@ApiTags('Client')
@Controller('Client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'registr Client' })
  @ApiResponse({ status: 201, type: Client })
  @Post('signup')
  regstration(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.registration(createClientDto, res);
  }

  @ApiOperation({ summary: 'login Client' })
  @HttpCode(200)
  @Post('login')
  login(
    @Body() loginUserDto: LoginClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: 'logout Client' })
  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'refresh Client' })
  @HttpCode(200)
  @Post('/:id/refresh')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.refreshToken(id, refreshToken, res);
  }

  @ApiOperation({ summary: 'activate Client' })
  @Get('activate/:link')
  activate(
    @Param('link') link: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.activate(link, res);
  }

  @ApiOperation({ summary: 'all client take' })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @ApiOperation({ summary: 'all client take' })
  @UseGuards(CoachGuard)
  @Get()
  findAllDoc() {
    return this.clientService.findAllDoctor();
  }

  @ApiOperation({ summary: 'Find By Id client' })
  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @ApiOperation({ summary: 'Find By Id client' })
  @UseGuards(CoachGuard)
  @Get(':id')
  findOneCoach(@Param('id') id: string) {
    return this.clientService.findOneCoach(+id);
  }

  @ApiOperation({ summary: 'update client' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @ApiOperation({ summary: 'delete client' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
