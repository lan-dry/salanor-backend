import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from '../schemas/contact.schema';
import { CreateContactDto } from '../dto/create-contact.dto';

@Injectable()
export class ContactService {

	private readonly logger = new Logger(ContactService.name);

	constructor(
		@InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
		// private readonly mailService: MailService,
	) {}

	async handleContactForm(data: CreateContactDto): Promise<Contact> {
		// Save the contact message in MongoDB
		const createdContact = new this.contactModel(data);
		return await createdContact.save();

	// 	try {
	// 	// Example: forward to email
	// 	await this.mailService.sendMail({
	// 		to: 'support@salanor.com',
	// 		subject: `Contact Form: ${data.subject || 'No Subject'}`,
	// 		text: `
	// Name: ${data.name}
	// Email: ${data.email}
	// Subject: ${data.subject || '(No Subject)'}
	// Message: ${data.message}
	// 		`,
	// 	});

	// 	this.logger.log(`Contact message from ${data.email} saved and forwarded.`);
	// 	} catch (error) {
	// 	this.logger.error('Failed to send contact email', error);
	// 	throw error;
	// 	}
	}
}
