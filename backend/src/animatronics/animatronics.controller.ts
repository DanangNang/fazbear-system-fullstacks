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

  // --- ROUTE TRASH (HARUS DI ATAS :id) ---
  @Get('trash/all')
  findAllTrash() {
    return this.animatronicsService.findAllTrash();
  }

  @Post('trash/:id/restore')
  restoreFromTrash(@Param('id', ParseIntPipe) id: number) {
    return this.animatronicsService.restoreFromTrash(id);
  }

  @Delete('trash/empty')
  emptyTrash() {
    return this.animatronicsService.emptyTrash();
  }

  @Delete('trash/:id')
  permanentDeleteFromTrash(@Param('id', ParseIntPipe) id: number) {
    return this.animatronicsService.permanentDeleteFromTrash(id);
  }
  // --------------------------------------

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