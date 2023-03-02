import { Controller, Get } from '@nestjs/common';
import { PresenterService } from './presenter.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class PresenterController {
    constructor(private readonly presenterService: PresenterService) {
    }

    @Get()
    getHello(): string {
        return this.presenterService.getHello();
    }

    @EventPattern('event')
    public handle() {
        console.log('event handled');

        return 'Hello world!';
    }

    @MessagePattern({ cmd: 'get_hello' })
    public oneMoreHandler() {
        return 'Hello world!';
    }

}
