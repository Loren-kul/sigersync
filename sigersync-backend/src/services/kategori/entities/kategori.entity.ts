export class KategoriEntity {
  id!: string;
  name!: string;
  slug!: string;
  description?: string | null;
  icon?: string | null;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<KategoriEntity>) {
    Object.assign(this, data);
  }
}
