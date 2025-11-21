import { Controller, Post, Body } from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { AuditorioEntity } from './auditorio.entity/auditorio.entity';

@Controller('auditorio')
export class AuditorioController {
  constructor(private readonly auditorioService: AuditorioService) {}

  @Post()
  async crear(@Body() auditorio: AuditorioEntity): Promise<AuditorioEntity> {
    return this.auditorioService.crearAuditorio(auditorio);
  }
}
