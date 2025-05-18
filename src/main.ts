import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.setGlobalPrefix('api');
	app.use(cors(corsOptions));
	
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
