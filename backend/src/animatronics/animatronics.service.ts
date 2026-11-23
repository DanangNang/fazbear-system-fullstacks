import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimatronicDto } from './dto/create-animatronic.dto';
import { UpdateAnimatronicDto } from './dto/update-animatronic.dto';
import { Animatronic } from './entities/animatronic.entity';

@Injectable()
export class AnimatronicsService {
  private animatronics: Animatronic[] = [
    {
      id: 1,
      name: 'Freddy Fazbear',
      form: 'Bear',
      seriesGame: 'FNAF 1',
      threatLevel: 8,
      isPossessed: true,
      behaviorNote: 'Bergerak di kegelapan dari Show Stage menuju East Hall.',
      loggedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Springtrap',
      form: 'Rabbit',
      seriesGame: 'FNAF 3',
      threatLevel: 10,
      isPossessed: true,
      behaviorNote: 'Sangat agresif, tertarik pada suara audio lure.',
      loggedAt: new Date().toISOString(),
    },
  ];

  private nextId = 3;

  create(createAnimatronicDto: CreateAnimatronicDto): Animatronic {
    const isDuplicate = this.animatronics.some(
      (item) =>
        item.name.toLowerCase() === createAnimatronicDto.name.toLowerCase(),
    );

    if (isDuplicate) {
      throw new ConflictException(
        `Arsip untuk animatronic "${createAnimatronicDto.name}" sudah tercatat di sistem Fazbear!`,
      );
    }

    const newAnimatronic: Animatronic = {
      id: this.nextId++,
      ...createAnimatronicDto,
      loggedAt: new Date().toISOString(),
    };

    this.animatronics.push(newAnimatronic);
    return newAnimatronic;
  }

  findAll(): Animatronic[] {
    return this.animatronics;
  }

  findOne(id: number): Animatronic {
    const animatronic = this.animatronics.find((item) => item.id === id);

    if (!animatronic) {
      throw new NotFoundException(
        `Data animatronic dengan ID #${id} tidak ditemukan di database keamanan.`,
      );
    }

    return animatronic;
  }

  update(id: number, updateAnimatronicDto: UpdateAnimatronicDto): Animatronic {
    const existing = this.findOne(id);

    if (updateAnimatronicDto.name) {
      const isDuplicate = this.animatronics.some(
        (item) =>
          item.id !== id &&
          item.name.toLowerCase() === updateAnimatronicDto.name!.toLowerCase(),
      );
      if (isDuplicate) {
        throw new ConflictException(
          `Nama animatronic "${updateAnimatronicDto.name}" sudah digunakan oleh entitas lain!`,
        );
      }
    }

    const updatedAnimatronic: Animatronic = {
      ...existing,
      ...updateAnimatronicDto,
    };

    const index = this.animatronics.findIndex((item) => item.id === id);
    this.animatronics[index] = updatedAnimatronic;

    return updatedAnimatronic;
  }

  remove(id: number): { message: string; deletedData: Animatronic } {
    const existing = this.findOne(id);
    this.animatronics = this.animatronics.filter((item) => item.id !== id);

    return {
      message: `Arsip animatronic "${existing.name}" (ID #${id}) berhasil dihapus.`,
      deletedData: existing,
    };
  }
}