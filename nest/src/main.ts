import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
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
  const configService = app.get(ConfigService);

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
  const corsOrigins = configService.get<string>('CORS_ORIGINS')?.split(',') || [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];
  
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Configurar Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, swaggerUiOptions);

  // Obtener configuración del puerto
  const port = configService.get<number>('PORT') || 3001;
  const environment = configService.get<string>('NODE_ENV') || 'development';

  await app.listen(port);
  
  console.log(`🚀 Aplicación ejecutándose en: http://localhost:${port}`);
  console.log(`🌍 Entorno: ${environment}`);
  console.log(`📚 Documentación Swagger en: http://localhost:${port}/api`);
  console.log(`🔒 CORS habilitado para: ${corsOrigins.join(', ')}`);
}
bootstrap();
