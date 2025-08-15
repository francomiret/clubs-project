import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger.config';
import { swaggerUiOptions } from './swagger-ui.config';
import {
  HttpExceptionFilter,
  LoggingInterceptor,
  TransformInterceptor,
  RequestIdMiddleware,
  ValidationException
} from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global middleware
  const requestIdMiddleware = new RequestIdMiddleware();
  app.use(requestIdMiddleware.use.bind(requestIdMiddleware));

  // Configurar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
      const messages = errors.map(error =>
        `${error.property}: ${Object.values(error.constraints || {}).join(', ')}`
      );
      return new ValidationException(messages);
    },
  }));

  // Apply global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Apply global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // Configurar CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Configurar Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, swaggerUiOptions);

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Aplicación ejecutándose en: http://localhost:${process.env.PORT ?? 3001}`);
  console.log(`📚 Documentación Swagger en: http://localhost:${process.env.PORT ?? 3001}/api`);
}
bootstrap();
