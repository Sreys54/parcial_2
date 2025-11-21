import { Module } from '@nestjs/common';
import { AsistenteService } from './asistente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenteEntity } from './asistente.entity/asistente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AsistenteEntity])],
  providers: [AsistenteService],
})
export class AsistenteModule {}
