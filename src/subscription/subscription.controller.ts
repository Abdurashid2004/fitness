import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The subscription has been successfully created.',
  })
  @ApiBody({ type: CreateSubscriptionDto })
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all subscriptions.' })
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the subscription with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  @ApiParam({ name: 'id', type: 'integer', description: 'Subscription ID' })
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  @ApiParam({ name: 'id', type: 'integer', description: 'Subscription ID' })
  @ApiBody({ type: UpdateSubscriptionDto })
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(+id, updateSubscriptionDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  @ApiParam({ name: 'id', type: 'integer', description: 'Subscription ID' })
  remove(@Param('id') id: string) {
    return this.subscriptionService.remove(+id);
  }
}
