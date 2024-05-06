import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CoachService } from './coach.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginCoachDto } from './dto/login-coach.dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookie_getter.decorators';
import { AdminGuard } from '../guards/admin.guard';
import { ClientGuard } from '../guards/client.guard';

@ApiTags('Coach')
@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @ApiOperation({ summary: 'Login Coach' })
  @HttpCode(200)
  @Post('login')
  login(
    @Body() loginCoachDto: LoginCoachDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.coachService.login(loginCoachDto, res);
  }

  @ApiOperation({ summary: 'Logout Coach' })
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.coachService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Refresh Coach' })
  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.coachService.refreshToken(id, refreshToken, res);
  }

  @ApiOperation({ summary: 'Create Coach' })
  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createCoachDto: CreateCoachDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.coachService.create(createCoachDto, res);
  }

  @ApiOperation({ summary: 'Get all Coaches only Admin see' })
  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.coachService.findAll();
  }

  @ApiOperation({ summary: 'Get all Coaches only Coach see' })
  @Get()
  @UseGuards(ClientGuard)
  findAllCoach() {
    return this.coachService.findAllCoach();
  }

  @ApiOperation({ summary: 'Get Coach by ID' })
  @UseGuards(ClientGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Coach by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachService.update(+id, updateCoachDto);
  }

  @ApiOperation({ summary: 'Delete Coach by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachService.remove(+id);
  }
}
