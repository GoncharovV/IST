import { Controller, Get } from '@nestjs/common';
import { DbFillerService } from './db-filler.service';

@Controller()
export class DbFillerController {
  constructor(private readonly dbFillerService: DbFillerService) {}

  @Get()
  getHello(): string {
    return this.dbFillerService.getHello();
  }
}
