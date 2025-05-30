import { CallHandler, ExecutionContext, Injectable, NestInterceptor, } from '@nestjs/common';
import { Observable, map } from 'rxjs';
  
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) => ({
				statusCode: context.switchToHttp().getResponse().statusCode,
				success: true,
				data,
				message: 'Success',
				timeStamp: new Date()
			})),
		);
	}
}