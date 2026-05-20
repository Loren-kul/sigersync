import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { PrismaService } from '../../database/prisma.service';

// describe  mengelompokkan semua tes untuk KategoriService.
describe('KategoriService', () => {
  let service: KategoriService;
  let prisma: PrismaService;

  // Membuat data Kategori "Palsu" untuk bahan percobaan.
  const mockCategory = {
    id: '1',
    name: 'Travel',
    slug: 'travel',
    description: 'Travel category',
    icon: '✈️',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Membuat Database Tiruan (Mock). 
  // Tidak benar-benar menggunakan database asli agar tes berjalan cepat dan aman.
  const mockPrismaService = {
    category: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  // dijalankan sebelum satu butir tes dimulai.
   beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KategoriService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Memasang database tiruan ke service.
        },
      ],
    }).compile();

    service = module.get<KategoriService>(KategoriService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  // Membersihkan catatan memori setelah setiap tes selesai.
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Kelompok tes untuk fungsi CREATE (Menambah Data).
  describe('create', () => {
    // Skenario 1: Berhasil membuat kategori baru.
    it('should create a new category', async () => {
      const createDTO = { name: 'Travel', slug: 'travel' };

      // Mengatur database tiruan agar berpura-pura sukses mengembalikan data.
      mockPrismaService.category.findUnique.mockResolvedValueOnce(null);
      mockPrismaService.category.create.mockResolvedValueOnce(mockCategory);

      const result = await service.create(createDTO);

      // bagian pengecekan hasil.
      expect(result).toBeDefined(); // Memastikan ada hasilnya.
      expect(result.name).toBe('Travel'); // Memastikan namanya benar.
    });

    // Skenario 2: Gagal karena nama sudah ada (Conflict).
    it('should throw ConflictException if name exists', async () => {
      const createDTO = { name: 'Travel', slug: 'travel-2' };

      // Mengatur database tiruan agar berpura-pura menemukan nama yang sama.
      mockPrismaService.category.findUnique.mockResolvedValueOnce(mockCategory);

      // Memastikan sistem menolak (Error) jika ada nama kembar.
      await expect(service.create(createDTO)).rejects.toThrow(ConflictException);
    });
  });

  // Kelompok tes untuk fungsi FIND ALL (Melihat Semua Data).
  describe('findAll', () => {
    // Skenario: Berhasil mengambil semua data.
    it('should return all categories', async () => {
      mockPrismaService.category.findMany.mockResolvedValueOnce([mockCategory]);

      const result = await service.findAll();

      expect(Array.isArray(result)).toBe(true); // Memastikan hasilnya berupa daftar/array.
    });
    

    // Skenario: Error jika ternyata datanya kosong.
    it('should throw NotFoundException if no categories', async () => {
      mockPrismaService.category.findMany.mockResolvedValueOnce([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });
});