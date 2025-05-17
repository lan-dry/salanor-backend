import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PreOrderDocument = PreOrder & Document;

@Schema({ timestamps: true })
export class PreOrder {
	@Prop({ required: true })
	email: string;  // Customer's email

	@Prop({ required: true })
	product: string;  // Name of the product they pre-ordered (e.g., "Aether")

	@Prop()
	expectedLaunchDate: Date;  // Expected release date (optional)

	@Prop({ default: false })
	notified: boolean;  // Whether the user has been notified when the product launches
}

export const PreOrderSchema = SchemaFactory.createForClass(PreOrder);
