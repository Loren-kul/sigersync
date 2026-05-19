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
