import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { AuditorioEntity } from './auditorio.entity/auditorio.entity';

@Controller('auditorio')
export class AuditorioController {
  constructor(private readonly auditorioService: AuditorioService) {}

  @Post()
  async crear(@Body() auditorio: AuditorioEntity): Promise<AuditorioEntity> {
    return this.auditorioService.crearAuditorio(auditorio);
  }

  @Get()
  async listar(): Promise<AuditorioEntity[]> {
    return this.auditorioService.findAll();
  }

  @Get(':id')
  async obtener(@Param('id') id: string): Promise<AuditorioEntity> {
    return this.auditorioService.findAuditorioById(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() datos: Partial<AuditorioEntity>,
  ): Promise<AuditorioEntity> {
    return this.auditorioService.actualizarAuditorio(id, datos);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string): Promise<void> {
    return this.auditorioService.eliminarAuditorio(id);
  }
}
