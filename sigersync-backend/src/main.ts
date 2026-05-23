import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  // 1. Membuat aplikasi berdasarkan 'Cetak Biru' (AppModule).
  const app = await NestFactory.create(AppModule);

  // 2. Memasang Filter Otomatis untuk semua data yang masuk.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Buang data yang tidak dikenal.
      forbidNonWhitelisted: true, // Tolak permintaan jika ada data yang mencurigakan.
      transform: true, // Ubah tipe data otomatis (misal: tulisan "1" jadi angka 1).
    }),
  );

  // 3. Mengambil nomor pintu (Port) dari pengaturan .env.
  const port = process.env.PORT || 3000;

  // 4. Mulai mendengarkan permintaan dari internet.
  await app.listen(port);

  // 5. Menampilkan informasi alamat API di terminal sebagai panduan buat pengembang.
  console.log(`✅ Application is running on: http://localhost:${port}`);
  console.log(`🏷️  Kategori API: http://localhost:${port}/api/categories`);
}

// Menjalankan fungsi di atas.
bootstrap();
