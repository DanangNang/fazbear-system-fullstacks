import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimatronicsModule } from './animatronics/animatronics.module';

@Module({
  imports: [AnimatronicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
