// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import * as express from 'express';
import * as cors from 'cors';
import serverlessExpress from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';

let server: Handler;

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

  // Wrap the Express app with serverless-express
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());
  
  // Now, pass all three arguments: event, context, and callback
  return server(event, context, callback);
};
