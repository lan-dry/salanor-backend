import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import * as express from 'express';
import * as cors from 'cors';
import serverlessExpress from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';

async function bootstrap(): Promise<Handler> {
  const expressApp = express();

  const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
  };
  expressApp.use(cors(corsOptions));

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api');
  await app.init();

  // Return serverless-express handler
  return serverlessExpress({ app: expressApp });
}

// Directly export the handler as the default export
export const handler: Handler = async (event, context, callback) => {
  const server = await bootstrap();
  return server(event, context, callback);
};

// Ensure this is the default export
export default handler;  // Important for AWS Lambda's serverless-express
