import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PreOrder, PreOrderDocument } from '../schemas/pre-order.schema';
import { CreatePreOrderDto } from '../dto/create-pre-order.dto';

@Injectable()
export class PreOrderService {

	constructor(
		@InjectModel(PreOrder.name) private preOrderModel: Model<PreOrderDocument>,
	) {}
	
	async createPreOrder(createPreOrderDto: CreatePreOrderDto): Promise<PreOrder> {
		const newPreOrder = new this.preOrderModel(createPreOrderDto);
		return await newPreOrder.save();
	}
}
