import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Client } from './entities/client.entity';
import { MailService } from '../email/mail.service';
import { CreateClientDto } from './dto/create-client.dto';
import { LoginClientDto } from './dto/login-patient.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client) private readonly userRepo: typeof Client,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly logger: Logger,
  ) {}

  async getTokens(client: Client) {
    const payload = {
      id: client.id,
      is_active: client.is_active,
      is_owner: client.is_owner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY_CLIENT,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY_CLIENT,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async registration(createClientDto: CreateClientDto, res: Response) {
    this.logger.log('Calling login()', ClientService.name);
    this.logger.debug('Calling login()', ClientService.name);
    this.logger.verbose('Calling login()', ClientService.name);
    this.logger.warn('Calling login()', ClientService.name);
    try {
      const user = await this.userRepo.findOne({
        where: { email: createClientDto.email },
      });
      if (user) {
        throw new BadRequestException('There is such a user');
      }
      if (createClientDto.password !== createClientDto.confirm_password) {
        throw new BadRequestException('Passwords do not match');
      }

      const hashed_password = await bcrypt.hash(createClientDto.password, 7);
      const newUser = await this.userRepo.create({
        ...createClientDto,
        hashed_password,
      });
      const tokens = await this.getTokens(newUser);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
      const activation_link = v4();

      const updateUser = await this.userRepo.update(
        { hashed_refresh_token, activation_link },
        {
          where: { id: newUser.id },
          returning: true,
        },
      );
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      try {
        await this.mailService.sendMail(updateUser[1][0]);
      } catch (error) {
        console.log(error);
        throw new BadRequestException('email sent error');
      }
      // Javobni tayyorlash
      const response = {
        message: 'User registered',
        user: updateUser[1][0],
        tokens,
      };
      return response;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async activate(link: string, res: Response) {
    this.logger.log('Calling login()', ClientService.name);
    this.logger.debug('Calling login()', ClientService.name);
    this.logger.verbose('Calling login()', ClientService.name);
    this.logger.warn('Calling login()', ClientService.name);
    try {
      if (!link) {
        throw new BadRequestException('Activate link not found');
      }

      const updateUser = await this.userRepo.update(
        { is_active: true },
        {
          where: { activation_link: link, is_active: false },
          returning: true,
        },
      );
      if (!updateUser[1][0]) {
        throw new BadRequestException('Usser already acdtivated');
      }
      const response = {
        message: 'Nma gap maza yaxshimi 😁',
        user: updateUser[1][0].is_active,
      };
      return response;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async login(loginClientDto: LoginClientDto, res: Response) {
    this.logger.log('Calling login()', ClientService.name);
    this.logger.debug('Calling login()', ClientService.name);
    this.logger.verbose('Calling login()', ClientService.name);
    this.logger.warn('Calling login()', ClientService.name);

    const { email, password } = loginClientDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!user.is_active) {
      throw new BadRequestException('User not act');
    }
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);

    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }
    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    const updateUser = await this.userRepo.update(
      { hashed_refresh_token, activation_link },
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
      message: 'User loggid in',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    this.logger.log('Calling login()', ClientService.name);
    this.logger.debug('Calling login()', ClientService.name);
    this.logger.verbose('Calling login()', ClientService.name);
    this.logger.warn('Calling login()', ClientService.name);
    try {
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY_CLIENT,
      });
      if (!userData) {
        throw new ForbiddenException('Client not verifid');
      }
      const updateUser = await this.userRepo.update(
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
        message: 'Client logged out successfuly',
        user: updateUser[1][0].hashed_refresh_token,
      };
      return response;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    this.logger.log('Calling login()', ClientService.name);
    this.logger.debug('Calling login()', ClientService.name);
    this.logger.verbose('Calling login()', ClientService.name);
    this.logger.warn('Calling login()', ClientService.name);
    try {
      const decodedToken = await this.jwtService.decode(refreshToken);
      if (userId != decodedToken['id']) {
        throw new BadRequestException('ruxsat etilmagan1');
      }
      const user = await this.userRepo.findOne({ where: { id: userId } });
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
      const activation_link = v4();

      const updateUser = await this.userRepo.update(
        { hashed_refresh_token, activation_link },
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
        message: 'User successfuly in',
        user: updateUser[1][0],
        tokens,
      };
      return response;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async findByEmail(email: string): Promise<Client> {
    return this.userRepo.findOne({ where: { email }, include: { all: true } });
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findAllDoctor() {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    const client = await this.userRepo.findByPk(id);
    if (client) {
      throw new BadRequestException(`There is no Client with such an ${id}`);
    }
    return client;
  }

  async findOneCoach(id: number) {
    const client1 = await this.userRepo.findByPk(id);
    if (client1) {
      throw new BadRequestException(`There is no Client with such an ${id}`);
    }
    return this.userRepo.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateClientDto) {
    const client1 = await this.userRepo.findByPk(id);
    if (client1) {
      throw new BadRequestException(`There is no Client with such an ${id}`);
    }
    const client = await this.userRepo.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return client[1][0];
  }

  async remove(id: number) {
    const client1 = await this.userRepo.destroy({ where: { id } });
    if (client1) {
      throw new BadRequestException(`There is no Client with such an ${id}`);
    }
    return client1;
  }
}
