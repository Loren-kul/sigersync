import { NotFoundException } from "@nestjs/common";

// Utility class untuk standarisasi pesan error saat kategori tidak ditemukan
export class KategoriNotExistUtil {
  // Keterangan error 404 khusus pencarian berdasarkan ID
  static throwNotFoundById(id: string): never {
    throw new NotFoundException(`Kategori dengan ID "${id}" tidak ditemukan`);
  }

  // Keterangan error 404 khusus pencarian berdasarkan Nama
  static throwNotFoundByName(name: string): never {
    throw new NotFoundException(
      `Kategori dengan nama "${name}" tidak ditemukan`,
    );
  }

  // Keterangan error 404 khusus pencarian berdasarkan Slug (URL)
  static throwNotFoundBySlug(slug: string): never {
    throw new NotFoundException(
      `Kategori dengan slug "${slug}" tidak ditemukan`,
    );
  }

  // Keterangan error 404 jika hasil list/daftar kategori kosong
  static throwEmptyList(): never {
    throw new NotFoundException("Tidak ada kategori yang tersedia");
  }
}
