import { Module } from '@nestjs/common';
import { PreOrderController } from './controllers/pre-order.controller';
import { PreOrderService } from './services/pre-order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PreOrder, PreOrderSchema } from './schemas/pre-order.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: PreOrder.name, schema: PreOrderSchema }]),
	],
	controllers: [PreOrderController],
	providers: [PreOrderService]
})
export class PreOrderModule {}
