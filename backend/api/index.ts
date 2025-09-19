import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';

let app: any;

async function createApp() {
  if (!app) {
    const expressApp = express();
    app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    // No need for api prefix since Vercel routing handles it
    // app.setGlobalPrefix('api');

    app.enableCors({
      origin: true, // Allow same-origin requests
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('Job Management API')
      .setDescription('API for managing job postings')
      .setVersion('1.0')
      .addTag('jobs')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.init();
  }
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('API handler called:', req.method, req.url);

    // Simple test response for root API path
    if (req.url === '/api' || req.url === '/') {
      return res.json({ message: 'Cybermind API is working', timestamp: new Date().toISOString() });
    }

    const app = await createApp();
    const server = app.getHttpAdapter().getInstance();
    return server(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}