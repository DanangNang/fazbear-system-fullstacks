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
  // Dimulai kosong tanpa data dummy
  private animatronics: Animatronic[] = [];
  // Penyimpanan sementara untuk entitas yang dihapus (Recycle Bin)
  private trash: Animatronic[] = [];

  // Menghitung ID berikutnya: otomatis reset ke 1 jika arsip & sampah kosong
  private getNextId(): number {
    const allItems = [...this.animatronics, ...this.trash];
    if (allItems.length === 0) {
      return 1;
    }
    const maxId = Math.max(...allItems.map((item) => item.id));
    return maxId + 1;
  }

  create(createDto: CreateAnimatronicDto): Animatronic {
    const isDuplicate = this.animatronics.some(
      (item) => item.name.toLowerCase() === createDto.name.trim().toLowerCase(),
    );

    if (isDuplicate) {
      throw new ConflictException(
        `Animatronic dengan nama "${createDto.name}" sudah terdaftar di arsip Fazbear!`,
      );
    }

    const newAnimatronic: Animatronic = {
      id: this.getNextId(),
      ...createDto,
      name: createDto.name.trim(),
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
        `Animatronic dengan ID #${id} tidak ditemukan di sistem.`,
      );
    }
    return animatronic;
  }

  update(id: number, updateDto: UpdateAnimatronicDto): Animatronic {
    const animatronic = this.findOne(id);

    if (updateDto.name) {
      const isDuplicate = this.animatronics.some(
        (item) =>
          item.id !== id &&
          item.name.toLowerCase() === updateDto.name!.trim().toLowerCase(),
      );
      if (isDuplicate) {
        throw new ConflictException(
          `Nama "${updateDto.name}" sudah digunakan oleh entitas lain!`,
        );
      }
    }

    Object.assign(animatronic, {
      ...updateDto,
      ...(updateDto.name ? { name: updateDto.name.trim() } : {}),
    });

    return animatronic;
  }

  // Soft Delete: Pindahkan ke Trash (Sampah)
  remove(id: number) {
    const index = this.animatronics.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Gagal menghapus: Animatronic dengan ID #${id} tidak ditemukan.`,
      );
    }

    const [deletedItem] = this.animatronics.splice(index, 1);
    this.trash.unshift(deletedItem);

    return {
      message: `Data "${deletedItem.name}" (ID #${id}) dipindahkan ke Trash.`,
      deleted: deletedItem,
    };
  }

  // --- FITUR TRASH / RECYCLE BIN ---

  findAllTrash(): Animatronic[] {
    return this.trash;
  }

  restoreFromTrash(id: number) {
    const index = this.trash.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Item ID #${id} tidak ditemukan di dalam Trash.`,
      );
    }

    const itemToRestore = this.trash[index];

    // Cek jika ada nama sama yang baru saja dibuat di arsip aktif
    const isDuplicateActive = this.animatronics.some(
      (item) => item.name.toLowerCase() === itemToRestore.name.toLowerCase(),
    );
    if (isDuplicateActive) {
      throw new ConflictException(
        `Tidak dapat mengembalikan "${itemToRestore.name}" karena nama tersebut sudah aktif di Archives.`,
      );
    }

    this.trash.splice(index, 1);
    this.animatronics.push(itemToRestore);
    // Urutkan kembali berdasarkan ID agar rapi
    this.animatronics.sort((a, b) => a.id - b.id);

    return {
      message: `Data "${itemToRestore.name}" (ID #${id}) berhasil dikembalikan ke Archives.`,
      restored: itemToRestore,
    };
  }

  permanentDeleteFromTrash(id: number) {
    const index = this.trash.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Item ID #${id} tidak ditemukan di dalam Trash.`,
      );
    }

    const [removed] = this.trash.splice(index, 1);
    return {
      message: `Data "${removed.name}" (ID #${id}) dihapus permanen.`,
    };
  }

  emptyTrash() {
    this.trash = [];
    return {
      message: 'Seluruh isi Trash berhasil dikosongkan.',
    };
  }
}