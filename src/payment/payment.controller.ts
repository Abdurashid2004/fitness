import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiResponse({
    status: 201,
    description: 'Payment created successfully',
    type: Payment,
  })
  @UseGuards(AdminGuard)
  @Post()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieve all payments successfully',
    type: [Payment],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieve payment by ID successfully',
    type: Payment,
  })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update payment by ID successfully',
    type: Payment,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Remove payment by ID successfully',
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
