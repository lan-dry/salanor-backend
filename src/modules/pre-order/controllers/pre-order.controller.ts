import { Body, Controller, Post } from '@nestjs/common';
import { PreOrderService } from '../services/pre-order.service';
import { CreatePreOrderDto } from '../dto/create-pre-order.dto';

@Controller('pre-order')
export class PreOrderController {

	constructor(private readonly preOrderService: PreOrderService) {}

	@Post()
	async createPreOrder(@Body() createPreOrderDto: CreatePreOrderDto) {
		return this.preOrderService.createPreOrder(createPreOrderDto);
	}
}
