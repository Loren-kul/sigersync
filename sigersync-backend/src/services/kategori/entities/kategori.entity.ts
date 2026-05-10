export class KategoriEntity {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<KategoriEntity>) {
    Object.assign(this, data);
  }
}
