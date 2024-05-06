import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('payment-type')
@Controller('payment-type')
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The payment type has been successfully created.',
  })
  create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypeService.create(createPaymentTypeDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all payment types.' })
  findAll() {
    return this.paymentTypeService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the payment type with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Payment type not found.' })
  findOne(@Param('id') id: string) {
    return this.paymentTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The payment type has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Payment type not found.' })
  update(
    @Param('id') id: string,
    @Body() updatePaymentTypeDto: UpdatePaymentTypeDto,
  ) {
    return this.paymentTypeService.update(+id, updatePaymentTypeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The payment type has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Payment type not found.' })
  remove(@Param('id') id: string) {
    return this.paymentTypeService.remove(+id);
  }
}
