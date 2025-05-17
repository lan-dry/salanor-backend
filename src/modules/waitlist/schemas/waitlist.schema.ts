import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WaitlistDocument = Waitlist & Document;

@Schema({ timestamps: true })
export class Waitlist {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
  	product: string;
}

export const WaitlistSchema = SchemaFactory.createForClass(Waitlist);
