import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { AsistenteEntity } from './asistente.entity/asistente.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { EventoEntity } from 'src/evento/evento.entity/evento.entity';

@Injectable()
export class AsistenteService {
  constructor(
    @InjectRepository(AsistenteEntity)
    private readonly asistenteRepository: Repository<AsistenteEntity>,
    @InjectRepository(EventoEntity)
    private readonly eventoRepository: Repository<EventoEntity>,
  ) {}

  async findAsistentebyEvento(idEvento: string): Promise<AsistenteEntity[]> {
    return this.asistenteRepository.find({
      where: { evento: { id: idEvento } },
      relations: ['evento'],
    });
  }

  async registrarAsistente(
    idEvento: string,
    asistente: AsistenteEntity,
  ): Promise<AsistenteEntity> {
    const evento = await this.eventoRepository.findOne({
      where: { id: idEvento },
      relations: ['auditorio'],
    });

    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }

    const existente = await this.asistenteRepository.findOne({
      where: { evento: { id: idEvento }, email: asistente.email },
    });

    if (existente) {
      throw new ConflictException(
        'Ya existe un asistente con ese email en el evento',
      );
    }

    const cantidadActual = await this.asistenteRepository.count({
      where: { evento: { id: idEvento } },
    });

    const capacidad = evento.auditorio?.capacidad ?? null;
    if (capacidad != null && cantidadActual >= capacidad) {
      throw new BadRequestException(
        'No se puede registrar: capacidad del auditorio excedida',
      );
    }

    asistente.evento = evento;

    return this.asistenteRepository.save(asistente);
  }
}
