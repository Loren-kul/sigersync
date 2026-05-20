import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable() // Menandai bahwa Layanan yang bisa digunakan oleh bagian aplikasi lain
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super(); // Memanggil constructor dari PrismaClient
  }
  
  // Fungsi yang otomatis berjalan saat aplikasi Pertama kali menyala
  async onModuleInit() {
    await this.$connect(); // Perintah untuk membuka koneksi ke database
  }

  // Fungsi yang otomatis berjalan saat aplikasi di matikan
  async onModuleDestroy() {
    await this.$disconnect(); // Perintah untuk memutus koneksi agar database tidak terbebani
  }
}