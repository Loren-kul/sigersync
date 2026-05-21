import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateKategoriDTO } from "./dto/create-kategori.dto";
import { UpdateKategoriDTO } from "./dto/update-kategori.dto";
import { KategoriEntity } from "./entities/kategori.entity";
import { KategoriConflictUtil } from "./utils/conflict-kategori.util";
import { KategoriNotExistUtil } from "./utils/not-exist-kategori.util";

type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class KategoriService {
  constructor(private prisma: PrismaService) {}

  // Membuat kategori baru
  async create(createKategoriDTO: CreateKategoriDTO): Promise<KategoriEntity> {
    // Validasi: Cek apakah nama sudah digunakan
    const existingByName = (await this.prisma.category.findUnique({
      where: { name: createKategoriDTO.name },
    })) as CategoryRecord | null;

    if (existingByName) {
      KategoriConflictUtil.throwNameExists(createKategoriDTO.name);
    }
    // Validasi: Cek apakah slug sudah digunakan
    const existingBySlug = (await this.prisma.category.findUnique({
      where: { slug: createKategoriDTO.slug },
    })) as CategoryRecord | null;

    if (existingBySlug) {
      KategoriConflictUtil.throwSlugExists(createKategoriDTO.slug);
    }

    // Simpan data ke database
    const category = (await this.prisma.category.create({
      data: {
        name: createKategoriDTO.name,
        slug: createKategoriDTO.slug,
        description: createKategoriDTO.description,
        icon: createKategoriDTO.icon,
      },
    })) as CategoryRecord;

    return new KategoriEntity(category);
  }

  async findAll(): Promise<KategoriEntity[]> {
    const categories =
      (await this.prisma.category.findMany()) as CategoryRecord[];

    if (categories.length === 0) {
      KategoriNotExistUtil.throwEmptyList();
    }

    return categories.map((category) => new KategoriEntity(category));
  }

  async findById(id: string): Promise<KategoriEntity> {
    const category = (await this.prisma.category.findUnique({
      where: { id },
    })) as CategoryRecord | null;

    if (!category) {
      KategoriNotExistUtil.throwNotFoundById(id);
    }

    return new KategoriEntity(category);
  }

  // Mencari satu kategori berdasarkan Slug (untuk URL)
  async findBySlug(slug: string): Promise<KategoriEntity> {
    const category = (await this.prisma.category.findUnique({
      where: { slug },
    })) as CategoryRecord | null;

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
      const existingByName = (await this.prisma.category.findUnique({
        where: { name: updateKategoriDTO.name },
      })) as CategoryRecord | null;

      if (existingByName && existingByName.id !== id) {
        KategoriConflictUtil.throwNameExists(updateKategoriDTO.name);
      }
    }

    // Jika slug diubah, cek apakah slug baru sudah dipakai kategori lain
    if (updateKategoriDTO.slug) {
      const existingBySlug = (await this.prisma.category.findUnique({
        where: { slug: updateKategoriDTO.slug },
      })) as CategoryRecord | null;

      if (existingBySlug && existingBySlug.id !== id) {
        KategoriConflictUtil.throwSlugExists(updateKategoriDTO.slug);
      }
    }

    // Eksekusi update data
    const updatedCategory = (await this.prisma.category.update({
      where: { id },
      data: updateKategoriDTO,
    })) as CategoryRecord;

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
