import { Global, Module } from '@nestjs/common';
import { PaginationService } from './services/pagination.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { RequestIdMiddleware } from './middleware/request-id.middleware';

@Global()
@Module({
    providers: [
        PaginationService,
        HttpExceptionFilter,
        LoggingInterceptor,
        TransformInterceptor,
        RequestIdMiddleware,
    ],
    exports: [
        PaginationService,
        HttpExceptionFilter,
        LoggingInterceptor,
        TransformInterceptor,
        RequestIdMiddleware,
    ],
})
export class CommonModule { } 