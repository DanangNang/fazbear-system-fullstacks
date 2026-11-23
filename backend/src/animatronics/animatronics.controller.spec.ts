import { Test, TestingModule } from '@nestjs/testing';
import { AnimatronicsController } from './animatronics.controller';
import { AnimatronicsService } from './animatronics.service';

describe('AnimatronicsController', () => {
  let controller: AnimatronicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimatronicsController],
      providers: [AnimatronicsService],
    }).compile();

    controller = module.get<AnimatronicsController>(AnimatronicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
