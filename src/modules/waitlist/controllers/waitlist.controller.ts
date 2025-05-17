import { Body, Controller, Post } from '@nestjs/common';
import { WaitlistService } from '../services/waitlist.service';

@Controller('waitlist')
export class WaitlistController {

	constructor(private readonly waitlistService: WaitlistService) {}

	@Post()
	async addToWaitlist(@Body() data: any) {
		return this.waitlistService.addEmail(data);
	}
}
