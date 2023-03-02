import { Injectable } from '@nestjs/common';

@Injectable()
export class PresenterService {
  getHello(): string {
    return 'Hello World!';
  }
}
