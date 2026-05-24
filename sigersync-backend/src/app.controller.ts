import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

// pengatur lalu lintas untuk alamat utama (/).
@Controller()
export class AppController {
  // Menghubungkan Controller dengan AppService agar bisa mengambil data/pesan.
  constructor(private readonly appService: AppService) {}

  // menangani permintaan masuk ketika seseorang membuka alamat web utama.
  @Get()
  getHello(): string {
    // Meminta pesan sapaan dari AppService dan mengirimkannya ke layar pengguna.
    return this.appService.getHello();
  }
}
