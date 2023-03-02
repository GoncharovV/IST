import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

export const PRESENTER_TOKEN = 'PRESENTER';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PRESENTER',
                transport: Transport.TCP,
            },
        ]),
    ],
    controllers: [GatewayController],
    providers: [GatewayService],
})
export class GatewayModule {
}
