import { Controller, Get, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { PRESENTER_TOKEN } from './gateway.module';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
    constructor(
        private readonly gatewayService: GatewayService,
        @Inject('PRESENTER') private readonly presenterClient: ClientProxy,
    ) {
        setTimeout(() => {
            presenterClient.send({
                cmd: 'get_hello',
            }, {}).subscribe(console.log)

                // .emit('event', {}).subscribe(console.log)
        }, 5000)
    }

    @Get()
    getHello(): string {
        return this.gatewayService.getHello();
    }
}
