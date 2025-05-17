import { IsEmail, IsInt, Min } from 'class-validator';

export class CreatePreOrderDto {
	@IsEmail()
	email: string;

	@IsEmail()
	product: string;
  
	@IsInt()
	@Min(1)
	quantity: number;
}
  