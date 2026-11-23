import { Test, TestingModule } from '@nestjs/testing';
import { AnimatronicsService } from './animatronics.service';

describe('AnimatronicsService', () => {
  let service: AnimatronicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimatronicsService],
    }).compile();

    service = module.get<AnimatronicsService>(AnimatronicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
