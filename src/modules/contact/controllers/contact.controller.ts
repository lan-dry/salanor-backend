import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ContactService } from '../services/contact.service';

@Controller('contact')
export class ContactController {

	constructor(private readonly contactService: ContactService) {}

	@Post()
	async sendMessage(@Body() dto: CreateContactDto): Promise<{ message: string }> {
		try {
			await this.contactService.handleContactForm(dto);
		return { message: 'Your message was sent successfully!' };
		} catch (error) {
			throw new HttpException('Failed to send your message. Please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
