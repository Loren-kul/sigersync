import { Injectable } from "@nestjs/common";

// @Injectable() menandakan bahwa kelas ini adalah 'pelayan' (service)
// yang datanya bisa digunakan oleh bagian lain aplikasi.
@Injectable()
export class AppService {
  // Fungsi ini bertugas menyiapkan teks sapaan.
  getHello(): string {
    // Memberikan jawaban berupa tulisan selamat datang.
    return "Welcome to SigerSync Backend Microservices API!";
  }
}
