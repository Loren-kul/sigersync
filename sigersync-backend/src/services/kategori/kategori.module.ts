import { Module } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { KategoriController } from './kategori.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [KategoriController],
  providers: [KategoriService],
  exports: [KategoriService],
})
export class KategoriModule {}
