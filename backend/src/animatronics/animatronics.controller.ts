import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AnimatronicsService } from './animatronics.service';
import { CreateAnimatronicDto } from './dto/create-animatronic.dto';
import { UpdateAnimatronicDto } from './dto/update-animatronic.dto';

@Controller('animatronics')
export class AnimatronicsController {
  constructor(private readonly animatronicsService: AnimatronicsService) { }

  @Post()
  create(@Body() createAnimatronicDto: CreateAnimatronicDto) {
    return this.animatronicsService.create(createAnimatronicDto);
  }

  @Get()
  findAll() {
    return this.animatronicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.animatronicsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnimatronicDto: UpdateAnimatronicDto,
  ) {
    return this.animatronicsService.update(id, updateAnimatronicDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.animatronicsService.remove(id);
  }
}