import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateContactDto {
	@IsNotEmpty({ message: 'Full name is required.' })
	@Length(2, 100)
	name: string;

	@IsEmail({}, { message: 'Email must be valid.' })
	email: string;

	@IsOptional()
	@Length(0, 255)
	subject?: string;

	@IsNotEmpty({ message: 'Message is required.' })
	@Length(10, 1000)
	message: string;
}
