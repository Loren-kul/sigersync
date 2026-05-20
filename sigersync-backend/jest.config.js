module.exports = {
  // Memberi tahu sistem jenis file apa saja yang boleh diperiksa (JS, JSON, dan TypeScript).
  moduleFileExtensions: ['js', 'json', 'ts'],

  // Menentukan folder utama tempat mesin pemeriksa harus mencari kode (folder 'src').
  rootDir: 'src',

  // Mencari file. Semua file yang namanya berakhiran '.spec.ts' akan dianggap sebagai file tes.
  testRegex: '.*\\.spec\\.ts$',

  // menerjemahkan kode TypeScript menjadi bahasa yang dimengerti mesin saat tes berjalan.
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // Untuk melihat seberapa banyak kode yang sudah diuji.
  collectCoverageFrom: [
    '**/*.(t|j)s',
  ],

  // Tempat menyimpan folder laporan hasil. Hasilnya bisa lihat di folder 'coverage'.
  coverageDirectory: '../coverage',

  // Menjalankan tes di lingkungan Node.js (lingkungan sisi server).
  testEnvironment: 'node',
};