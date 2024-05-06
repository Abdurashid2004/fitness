import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Week } from './entities/week.entity';

@Injectable()
export class WeeksService {
  constructor(@InjectModel(Week) private readonly weekRepo: typeof Week) {}

  async create(createWeekDto: CreateWeekDto) {
    const newWeek = await this.weekRepo.create(createWeekDto);
    return newWeek;
  }

  async findAll() {
    const weeks = await this.weekRepo.findAll();
    return weeks;
  }

  async findAllCoach() {
    const weeks = await this.weekRepo.findAll();
    return weeks;
  }

  async findOne(id: number) {
    const week = await this.weekRepo.findByPk(id);
    if (!week) throw new NotFoundException(`these is not ${id} Week`);
    return week;
  }

  async update(id: number, updateWeekDto: UpdateWeekDto) {
    const updatedWeek = await this.weekRepo.update(updateWeekDto, {
      where: { id },
      returning: true,
    });
    if (!updatedWeek) throw new NotFoundException(`these is not ${id} Week`);
    return updatedWeek[1][0];
  }

  async remove(id: number) {
    const deletedWeek = await this.weekRepo.destroy({ where: { id } });
    if (!deletedWeek) throw new NotFoundException(`these is not ${id} Week`);
    return deletedWeek;
  }
}
