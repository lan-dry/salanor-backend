import { Module } from '@nestjs/common';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schemas/contact.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])
	],
	controllers: [ContactController],
	providers: [ContactService]
})
export class ContactModule {}
