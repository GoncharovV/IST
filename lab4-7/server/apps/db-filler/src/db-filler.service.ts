import { Injectable } from '@nestjs/common';

@Injectable()
export class DbFillerService {
  getHello(): string {
    return 'Hello World!!!!';
  }
}
