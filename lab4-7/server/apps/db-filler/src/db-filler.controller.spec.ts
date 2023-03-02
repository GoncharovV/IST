import { Test, TestingModule } from '@nestjs/testing';
import { DbFillerController } from './db-filler.controller';
import { DbFillerService } from './db-filler.service';

describe('DbFillerController', () => {
  let dbFillerController: DbFillerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DbFillerController],
      providers: [DbFillerService],
    }).compile();

    dbFillerController = app.get<DbFillerController>(DbFillerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(dbFillerController.getHello()).toBe('Hello World!');
    });
  });
});
