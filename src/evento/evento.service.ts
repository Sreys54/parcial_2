import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EventoEntity, Estado } from './evento.entity/evento.entity';
import {
  PonenteEntity,
  TipoPonente,
} from 'src/ponente/ponente.entity/ponente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(EventoEntity)
    private readonly eventoRepository: Repository<EventoEntity>,
    @InjectRepository(PonenteEntity)
    private readonly ponenteRepository: Repository<PonenteEntity>,
  ) {}

  async findEventoById(id: string): Promise<EventoEntity> {
    const evento = await this.eventoRepository.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    return evento;
  }

  async eliminarEvento(id: string): Promise<void> {
    const evento = await this.eventoRepository.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    if (evento.estado === Estado.APROBADO) {
      throw new BadRequestException(
        'No se puede eliminar un evento ya aprobado',
      );
    }
    await this.eventoRepository.delete(id);
  }

  async crearEvento(evento: EventoEntity): Promise<EventoEntity> {
    if (evento.duracionHoras == null || evento.duracionHoras <= 0) {
      throw new BadRequestException('La duración debe ser positiva');
    }

    if (evento.ponente) {
      let ponente: PonenteEntity | null = null;

      const posibleId = (evento.ponente as any).id;
      if (posibleId) {
        ponente = await this.ponenteRepository.findOne({
          where: { id: posibleId },
        });
        if (!ponente) {
          throw new NotFoundException('Ponente no encontrado');
        }
      }

      if (ponente && ponente.tipoPonenete === TipoPonente.INVITADO) {
        if (!evento.descripcion || evento.descripcion.length < 50) {
          throw new BadRequestException(
            'Si el ponente es Invitado, la descripción debe tener al menos 50 caracteres',
          );
        }
      }
    }

    return this.eventoRepository.save(evento);
  }

  async aprobarEvento(id: string): Promise<void> {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['auditorio'],
    });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    if (!evento.auditorio) {
      throw new BadRequestException(
        'No se puede aprobar un evento sin auditorio asignado',
      );
    }
    if (evento.estado === Estado.APROBADO) {
      throw new BadRequestException('El evento ya está aprobado');
    }
    evento.estado = Estado.APROBADO;
    await this.eventoRepository.save(evento);
  }
}
