import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentsRepository, PAYMENTS_REPOSITORY } from './payments.repository';

@Module({
    controllers: [PaymentsController],
    providers: [
        PaymentsService,
        {
            provide: PAYMENTS_REPOSITORY,
            useClass: PaymentsRepository,
        },
    ],
    exports: [PaymentsService],
})
export class PaymentsModule { } 