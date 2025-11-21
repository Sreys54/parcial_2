import { Injectable, BadRequestException } from '@nestjs/common';
import { AuditorioEntity } from './auditorio.entity/auditorio.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuditorioService {
  constructor(
    @InjectRepository(AuditorioEntity)
    private readonly auditorioRepository: Repository<AuditorioEntity>,
  ) {}

  async crearAuditorio(auditorio: AuditorioEntity): Promise<AuditorioEntity> {
    if (auditorio.capacidad == null || auditorio.capacidad <= 0) {
      throw new BadRequestException(
        'La capacidad del auditorio debe ser mayor a 0',
      );
    }

    return await this.auditorioRepository.save(auditorio);
  }
}
