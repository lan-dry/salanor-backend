import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaitlistModule } from './modules/waitlist/waitlist.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PreOrderModule } from './modules/pre-order/pre-order.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, // Makes config available across the app
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGODB_URI'),
				// useNewUrlParser: true,
				// useUnifiedTopology: true,
			}),
			inject: [ConfigService],
		}),
		WaitlistModule,
		PreOrderModule,
		ContactModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
