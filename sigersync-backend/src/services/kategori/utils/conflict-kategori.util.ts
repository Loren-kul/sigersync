import { ConflictException } from '@nestjs/common';

export class KategoriConflictUtil {
  static throwNameExists(name: string): never {
    throw new ConflictException(
      `Kategori dengan nama "${name}" sudah ada`,
    );
  }

  static throwSlugExists(slug: string): never {
    throw new ConflictException(
      `Kategori dengan slug "${slug}" sudah digunakan`,
    );
  }

  static throwDuplicateFields(field: string): never {
    throw new ConflictException(
      `Duplikasi field "${field}" pada kategori`,
    );
  }
}
