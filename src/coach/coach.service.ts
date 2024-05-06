import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Coach } from './entities/coach.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginCoachDto } from './dto/login-coach.dto';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Response } from 'express';

@Injectable()
export class CoachService {
  constructor(
    @InjectModel(Coach) private readonly coachRepo: typeof Coach,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async getTokens(coach: Coach) {
    const payload = {
      id: coach.id,
      is_active: coach.is_active,
      is_owner: coach.is_owner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY_COACH,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY_COACH,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginCoachDto: LoginCoachDto, res: Response) {
    this.logger.log('Calling login()', CoachService.name);
    this.logger.debug('Calling login()', CoachService.name);
    this.logger.verbose('Calling login()', CoachService.name);
    this.logger.warn('Calling login()', CoachService.name);

    try {
      const { email, password } = loginCoachDto;
      const coach = await this.coachRepo.findOne({ where: { email } });

      if (!coach) {
        throw new BadRequestException('Coach not found');
      }
      if (!coach.is_active) {
        throw new BadRequestException('Coach not act');
      }
      const isMatchPass = await bcrypt.compare(password, coach.password);

      if (!isMatchPass) {
        throw new BadRequestException('Password do not match');
      }
      const tokens = await this.getTokens(coach);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
      const activation_link = v4();

      const updateUser = await this.coachRepo.update(
        { hashed_refresh_token, activation_link },
        {
          where: { id: coach.id },
          returning: true,
        },
      );

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const response = {
        message: 'User loggid in',
        user: updateUser[1][0],
        tokens,
      };
      return response;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async logout(refreshToken: string, res: Response) {
    this.logger.log('Calling login()', CoachService.name);
    this.logger.debug('Calling login()', CoachService.name);
    this.logger.verbose('Calling login()', CoachService.name);
    this.logger.warn('Calling login()', CoachService.name);
    try {
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY_COACH,
      });
      if (!userData) {
        throw new ForbiddenException('Coach not verifid');
      }
      const updateUser = await this.coachRepo.update(
        {
          hashed_refresh_token: null,
        },
        {
          where: { id: userData.id },
          returning: true,
        },
      );
      res.clearCookie('refresh_token');
      const response = {
        message: 'Coach logged out successfuly',
        user: updateUser[1][0].hashed_refresh_token,
      };
      return response;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    this.logger.log('Calling login()', CoachService.name);
    this.logger.debug('Calling login()', CoachService.name);
    this.logger.verbose('Calling login()', CoachService.name);
    this.logger.warn('Calling login()', CoachService.name);
    try {
      const decodedToken = await this.jwtService.decode(refreshToken);
      if (userId != decodedToken['id']) {
        throw new BadRequestException('ruxsat etilmagan1');
      }
      const user = await this.coachRepo.findOne({ where: { id: userId } });
      if (!user || !user.hashed_refresh_token) {
        throw new BadRequestException('user or token not2');
      }

      const tokenMatch = bcrypt.compare(
        refreshToken,
        user.hashed_refresh_token,
      );

      if (!tokenMatch) {
        throw new ForbiddenException('Forbidden');
      }
      const tokens = await this.getTokens(user);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      const updateUser = await this.coachRepo.update(
        { hashed_refresh_token },
        {
          where: { id: user.id },
          returning: true,
        },
      );

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const response = {
        message: 'Coach successfuly in',
        user: updateUser[1][0],
        tokens,
      };
      return response;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async create(createCoachDto: CreateCoachDto, res: Response) {
    this.logger.log('Calling login()', CoachService.name);
    this.logger.debug('Calling login()', CoachService.name);
    this.logger.verbose('Calling login()', CoachService.name);
    this.logger.warn('Calling login()', CoachService.name);
    try {
      const coach1 = await this.coachRepo.findOne({
        where: { email: createCoachDto.email },
      });
      if (coach1) {
        throw new BadRequestException('These is already coach');
      }
      const pass = await bcrypt.hash(createCoachDto.password, 7);
      createCoachDto.password = pass;

      const coach = await this.coachRepo.create(createCoachDto);
      return coach;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async findAll() {
    return this.coachRepo.findAll();
  }

  async findAllCoach() {
    return this.coachRepo.findAll();
  }

  async findOne(id: number) {
    const coach1 = await this.coachRepo.findByPk(id);
    if (coach1) {
      throw new BadRequestException(`There is no Coach with such an ${id}`);
    }
    const coach = await this.coachRepo.findByPk(id);
    return coach;
  }

  async update(id: number, updateCoachDto: UpdateCoachDto) {
    const coach1 = await this.coachRepo.findByPk(id);
    if (coach1) {
      throw new BadRequestException(`There is no Coach with such an ${id}`);
    }
    const coach = this.coachRepo.update(updateCoachDto, {
      where: { id },
      returning: true,
    });
    return coach[1][0];
  }

  async remove(id: number) {
    const coach1 = await this.coachRepo.findByPk(id);
    if (coach1) {
      throw new BadRequestException(`There is no Coach with such an ${id}`);
    }
    return this.coachRepo.destroy({ where: { id } });
  }
}
