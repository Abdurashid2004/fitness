import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateClientDayDto } from './dto/create-client-day.dto';
import { UpdateClientDayDto } from './dto/update-client-day.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ClientDay } from './entities/client-day.entity';
import { ModelCtor } from 'sequelize-typescript';
import { PassThrough } from 'stream';
import { WeeksService } from '../weeks/weeks.service';
import { PaymentTypeService } from '../payment-type/payment-type.service';
import { ClientService } from '../client/client.service';

@Injectable()
export class ClientDayService {
  constructor(
    @InjectModel(ClientDay)
    private readonly clientDayRepo: ModelCtor<ClientDay>,
    private readonly weeksService: WeeksService,
    private readonly clientService: ClientService,
  ) {}

  async create(createClientDayDto: CreateClientDayDto): Promise<ClientDay> {
    const weeks = await this.weeksService.findOne(createClientDayDto.weekId);
    if (!weeks) {
      throw new ForbiddenException('No ID');
    }

    const client = await this.clientService.findOne(
      createClientDayDto.clientId,
    );
    if (!client) {
      throw new ForbiddenException('No ID');
    }

    return this.clientDayRepo.create(createClientDayDto);
  }

  async findAll(): Promise<ClientDay[]> {
    return this.clientDayRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const client1 = await this.clientDayRepo.findByPk(id);
    if (client1) {
      throw new BadRequestException(`There is no Client with such an ${id}`);
    }
    const clientDay = await this.clientDayRepo.findByPk(id, {
      include: { all: true },
    });
    return clientDay;
  }

  async update(id: number, updateClientDayDto: UpdateClientDayDto) {
    const client1 = await this.clientDayRepo.findByPk(id);
    if (client1) {
      throw new BadRequestException(`There is no Client with such an ${id}`);
    }
    const client = await this.clientDayRepo.update(updateClientDayDto, {
      where: { id },
      returning: true,
    });
    return client[1][0];
  }

  async remove(id: number): Promise<number> {
    const deletedRowsCount = await this.clientDayRepo.destroy({
      where: { id },
    });
    return deletedRowsCount;
  }
}
