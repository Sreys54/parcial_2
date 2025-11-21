import { Module } from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditorioEntity } from './auditorio.entity/auditorio.entity';
import { AuditorioController } from './auditorio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuditorioEntity])],
  providers: [AuditorioService],
  controllers: [AuditorioController],
})
export class AuditorioModule {}
