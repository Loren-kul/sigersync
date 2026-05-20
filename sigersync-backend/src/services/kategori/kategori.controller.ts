import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
// ... (import lainnya)

// @Controller('kategori') berarti semua alamat dimulai dengan '/kategori'
@Controller('kategori')
export class KategoriController {
  // Menghubungkan Controller dengan Service (Si pekerja di balik layar).
  constructor(private readonly kategoriService: KategoriService) {}

  // POST: Digunakan untuk MENAMBAH kategori baru.
  @Post()
  @HttpCode(HttpStatus.CREATED) # Memberi sinyal '201 Created' (Berhasil Dibuat).
  async create(@Body() createKategoriDTO: CreateKategoriDTO) {
    return this.kategoriService.create(createKategoriDTO);
  }

  // GET: Digunakan untuk MENGAMBIL semua daftar kategori yang ada.
  @Get()
  @HttpCode(HttpStatus.OK) # Memberi sinyal '200 OK' (Berhasil).
  async findAll() {
    return this.kategoriService.findAll();
  }

  // GET + :id: Mencari satu kategori spesifik berdasarkan NOMOR ID-nya.
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return this.kategoriService.findById(id);
  }

  // GET + slug: Mencari satu kategori berdasarkan SLUG (nama unik di URL).
  @Get('slug/:slug')
  @HttpCode(HttpStatus.OK)
  async findBySlug(@Param('slug') slug: string) {
    return this.kategoriService.findBySlug(slug);
  }

  // PUT: Digunakan untuk MENGUBAH atau mengedit data kategori yang sudah ada.
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateKategoriDTO: UpdateKategoriDTO,
  ) {
    return this.kategoriService.update(id, updateKategoriDTO);
  }

  // DELETE: Digunakan untuk MENGHAPUS kategori.
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) # Memberi sinyal '204 No Content' (Berhasil dihapus).
  async delete(@Param('id') id: string) {
    return this.kategoriService.delete(id);
  }
}