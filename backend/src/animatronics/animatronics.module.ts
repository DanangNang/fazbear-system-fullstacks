import { Module } from '@nestjs/common';
import { AnimatronicsService } from './animatronics.service';
import { AnimatronicsController } from './animatronics.controller';

@Module({
  controllers: [AnimatronicsController],
  providers: [AnimatronicsService],
})
export class AnimatronicsModule {}
