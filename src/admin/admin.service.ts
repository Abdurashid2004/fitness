import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async getTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    console.log(payload);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    console.log(222222);

    this.logger.log('Calling login()', AdminService.name);
    this.logger.debug('Calling login()', AdminService.name);
    this.logger.verbose('Calling login()', AdminService.name);
    this.logger.warn('Calling login()', AdminService.name);
    try {
      const { login, password } = loginAdminDto;
      console.log('login', loginAdminDto.login, loginAdminDto.password);

      const admin = await this.adminRepo.findOne({ where: { login } });
      console.log(admin);

      if (!admin) {
        throw new BadRequestException('Admin not found');
      }
      if (!admin.is_active) {
        throw new BadRequestException('Admin not act');
      }
      console.log(password);

      const isMatchPass = await bcrypt.compare(password, admin.password);
      console.log(isMatchPass);

      if (!isMatchPass) {
        throw new BadRequestException('Password do not match');
      }
      const tokens = await this.getTokens(admin);
      console.log(tokens);
      console.log('salom');

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
      const updateAdmin = await this.adminRepo.update(
        { hashed_refresh_token },
        { where: { id: admin.id }, returning: true },
      );
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      const response = {
        message: 'admin loggid in',
        admin: updateAdmin[1][0],
        tokens,
      };
      return response;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async logout(refreshToken: string, res: Response) {
    this.logger.log('Calling login()', AdminService.name);
    this.logger.debug('Calling login()', AdminService.name);
    this.logger.verbose('Calling login()', AdminService.name);
    this.logger.warn('Calling login()', AdminService.name);
    try {
      const adminData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!adminData) {
        throw new ForbiddenException('admin not verifid');
      }
      const updateAdmin = await this.adminRepo.update(
        {
          hashed_refresh_token: null,
        },
        {
          where: { id: adminData.id },
          returning: true,
        },
      );
      res.clearCookie('refresh_token');
      const response = {
        message: 'Admin logged out successfuly',
        admin: updateAdmin[1][0].hashed_refresh_token,
      };
      return response;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async refreshToken(adminId: number, refreshToken: string, res: Response) {
    this.logger.log('Calling login()', AdminService.name);
    this.logger.debug('Calling login()', AdminService.name);
    this.logger.verbose('Calling login()', AdminService.name);
    this.logger.warn('Calling login()', AdminService.name);
    try {
      const decodedToken = await this.jwtService.decode(refreshToken);
      if (adminId != decodedToken['id']) {
        throw new BadRequestException('ruxsat etilmagan1');
      }
      const admin = await this.adminRepo.findOne({ where: { id: adminId } });
      if (!admin || !admin.hashed_refresh_token) {
        throw new BadRequestException('user or token not2');
      }
      const tokenMatch = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token,
      );

      if (!tokenMatch) {
        throw new ForbiddenException('Forbidden');
      }
      const tokens = await this.getTokens(admin);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      const updateAdmin = await this.adminRepo.update(
        { hashed_refresh_token },
        {
          where: { id: admin.id },
          returning: true,
        },
      );
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      const response = {
        message: 'admin refreshed in',
        admin: updateAdmin[1][0],
        tokens,
      };
      return response;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async getAdminByLogin(login: string): Promise<Admin> {
    return this.adminRepo.findOne({
      where: { login },
      include: { all: true },
    });
  }

  ///////////////////////////////////////////////////////////////
  async createAdmin(createAdminDto: CreateAdminDto, res: Response) {
    this.logger.log('Calling login()', AdminService.name);
    this.logger.debug('Calling login()', AdminService.name);
    this.logger.verbose('Calling login()', AdminService.name);
    this.logger.warn('Calling login()', AdminService.name);
    try {
      const admin1 = await this.adminRepo.findOne({
        where: { login: createAdminDto.login },
      });
      if (admin1) {
        throw new BadRequestException('These is already admin');
      }
      const pass = await bcrypt.hash(createAdminDto.password, 7);
      createAdminDto.password = pass;

      const admin = await this.adminRepo.create(createAdminDto);
      return admin;
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  }

  async findAllAdmin() {
    return this.adminRepo.findAll();
  }

  //////////////////////////////////////////
  async findOneAdmin(id: number) {
    const admin = await this.adminRepo.findByPk(id);
    if (!admin) {
      throw new BadRequestException('These is not admin');
    }
    return admin;
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    const admin1 = await this.adminRepo.findByPk(id);
    if (admin1) {
      throw new BadRequestException(`There is no Client with such an ${id}`);
    }
    const admin = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return admin[1][0];
  }

  async removeAdmin(id: number) {
    const admin1 = await this.adminRepo.findByPk(id);
    if (admin1) {
      throw new BadRequestException(`There is no Client with such an ${id}`);
    }
    return this.adminRepo.destroy({ where: { id } });
  }
}
