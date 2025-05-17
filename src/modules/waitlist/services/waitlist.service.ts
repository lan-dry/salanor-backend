import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Waitlist, WaitlistDocument } from '../schemas/waitlist.schema';

@Injectable()
export class WaitlistService {

	constructor(
		@InjectModel(Waitlist.name) private waitlistModel: Model<WaitlistDocument>
	) {}
	
	async addEmail(data: any) {
		console.log("email ", data)
		try {
			const exists = await this.waitlistModel.findOne({ email: data.email });
		if (exists) {
			return { message: 'Already on the waitlist' };
		}
		await this.waitlistModel.create(data);
			return { message: 'Successfully added to waitlist' };
		} catch (error) {
			throw new Error('Error adding to waitlist');
		}
	}
}
