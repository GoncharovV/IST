import { Module } from '@nestjs/common';
import { PresenterController } from './presenter.controller';
import { PresenterService } from './presenter.service';

@Module({
  imports: [],
  controllers: [PresenterController],
  providers: [PresenterService],
})
export class PresenterModule {}
