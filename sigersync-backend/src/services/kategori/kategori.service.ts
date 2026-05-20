import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateKategoriDTO } from './dto/create-kategori.dto';
import { UpdateKategoriDTO } from './dto/update-kategori.dto';
import { KategoriEntity } from './entities/kategori.entity';
import { KategoriConflictUtil } from './utils/conflict-kategori.util';
import { KategoriNotExistUtil } from './utils/not-exist-kategori.util';

@Injectable()
export class KategoriService {
  constructor(private prisma: PrismaService) {}

  // Membuat kategori baru
  async create(createKategoriDTO: CreateKategoriDTO): Promise<KategoriEntity> {
    // Validasi: Cek apakah nama sudah digunakan
    const existingByName = await this.prisma.category.findUnique({
      where: { name: createKategoriDTO.name },
    });

    if (existingByName) {
      KategoriConflictUtil.throwNameExists(createKategoriDTO.name);
    }
    // Validasi: Cek apakah slug sudah digunakan
    const existingBySlug = await this.prisma.category.findUnique({
      where: { slug: createKategoriDTO.slug },
    });

    if (existingBySlug) {
      KategoriConflictUtil.throwSlugExists(createKategoriDTO.slug);
    }

    // Simpan data ke database
    const category = await this.prisma.category.create({
      data: {
        name: createKategoriDTO.name,
        slug: createKategoriDTO.slug,
        description: createKategoriDTO.description,
        icon: createKategoriDTO.icon,
      },
    });

    return new KategoriEntity(category);
  }

  // Mengambil semua daftar kategori
  async findAll(): Promise<KategoriEntity[]> {
    const categories = await this.prisma.category.findMany();

    // Keterangan error jika tidak ada data sama sekali
    if (categories.length === 0) {
      KategoriNotExistUtil.throwEmptyList();
    }

    return categories.map((category) => new KategoriEntity(category));
  }

  // Mencari satu kategori berdasarkan ID
  async findById(id: string): Promise<KategoriEntity> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    // Keterangan error 404 jika ID tidak ditemukan
    if (!category) {
      KategoriNotExistUtil.throwNotFoundById(id);
    }

    return new KategoriEntity(category);
  }

  // Mencari satu kategori berdasarkan Slug (untuk URL)
  async findBySlug(slug: string): Promise<KategoriEntity> {
    const category = await this.prisma.category.findUnique({
      where: { slug },
    });

    // Keterangan error 404 jika Slug tidak ditemukan
    if (!category) {
      KategoriNotExistUtil.throwNotFoundBySlug(slug);
    }

    return new KategoriEntity(category);
  }

  // Memperbarui data kategori
  async update(
    id: string,
    updateKategoriDTO: UpdateKategoriDTO,
  ): Promise<KategoriEntity> {
    // Pastikan ID kategori ada sebelum diupdate
    await this.findById(id);

    // Jika nama diubah, cek apakah nama baru sudah dipakai kategori lain
    if (updateKategoriDTO.name) {
      const existingByName = await this.prisma.category.findUnique({
        where: { name: updateKategoriDTO.name },
      });

      if (existingByName && existingByName.id !== id) {
        KategoriConflictUtil.throwNameExists(updateKategoriDTO.name);
      }
    }

    // Jika slug diubah, cek apakah slug baru sudah dipakai kategori lain
    if (updateKategoriDTO.slug) {
      const existingBySlug = await this.prisma.category.findUnique({
        where: { slug: updateKategoriDTO.slug },
      });

      if (existingBySlug && existingBySlug.id !== id) {
        KategoriConflictUtil.throwSlugExists(updateKategoriDTO.slug);
      }
    }

    // Eksekusi update data
    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: updateKategoriDTO,
    });

    return new KategoriEntity(updatedCategory);
  }

  // Menghapus kategori
  async delete(id: string): Promise<void> {
    // Pastikan ID kategori ada sebelum dihapus
    await this.findById(id);

    await this.prisma.category.delete({
      where: { id },
    });
  }
}
