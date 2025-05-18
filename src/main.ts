import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import * as express from 'express';
import * as cors from 'cors';
// import serverlessExpress from '@vendia/serverless-express';
import { default as serverlessExpress } from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';

// Declare server as a handler
let server: Handler;

async function bootstrap(): Promise<Handler> {
  const expressApp = express();

  // Apply CORS options
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

  // Wrap the express app with serverless-express handler
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event, context, callback) => {
  // Initialize the server only once
  if (!server) {
    server = await bootstrap();
  }

  // Invoke the serverless express handler with event, context, and callback
  return server(event, context, callback);
};

// Ensure that we are exporting the handler as the default export
export default handler;  // This ensures Lambda uses the default export as the handler
