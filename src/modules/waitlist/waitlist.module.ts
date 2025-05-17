import { Module } from '@nestjs/common';
import { WaitlistController } from './controllers/waitlist.controller';
import { WaitlistService } from './services/waitlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Waitlist, WaitlistSchema } from './schemas/waitlist.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Waitlist.name, schema: WaitlistSchema }])
	],
	controllers: [WaitlistController],
	providers: [WaitlistService]
})
export class WaitlistModule {}
