import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription)
    private readonly subscriptRepo: typeof Subscription,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const newSubscription = await this.subscriptRepo.create(
      createSubscriptionDto,
    );
    return newSubscription;
  }

  async findAll() {
    const subscriptions = await this.subscriptRepo.findAll();
    return subscriptions;
  }

  async findOne(id: number) {
    const subscription = await this.subscriptRepo.findByPk(id);
    return subscription;
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const [numOfAffectedRows, [updatedSubscription]] =
      await this.subscriptRepo.update(updateSubscriptionDto, {
        where: { id },
        returning: true,
      });
    return updatedSubscription;
  }

  async remove(id: number) {
    const deletedSubscription = await this.subscriptRepo.destroy({
      where: { id },
    });
    return deletedSubscription[1][0];
  }
}
