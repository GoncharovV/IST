import { Module } from '@nestjs/common';
import { DbFillerController } from './db-filler.controller';
import { DbFillerService } from './db-filler.service';

@Module({
  imports: [],
  controllers: [DbFillerController],
  providers: [DbFillerService],
})
export class DbFillerModule {}
