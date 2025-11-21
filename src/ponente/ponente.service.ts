import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PonenteEntity, TipoPonente } from './ponente.entity/ponente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PonenteService {
  constructor(
    @InjectRepository(PonenteEntity)
    private readonly ponenteRepository: Repository<PonenteEntity>,
  ) {}

  async findPonenteById(id: string): Promise<PonenteEntity> {
    const ponente = await this.ponenteRepository.findOne({ where: { id } });
    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }
    return ponente;
  }

  async eliminarPonente(id: string): Promise<void> {
    const ponente = await this.ponenteRepository.findOne({
      where: { id },
      relations: ['eventos'],
    });

    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }

    if (ponente.eventos && ponente.eventos.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar un ponente con eventos asociados',
      );
    }

    await this.ponenteRepository.delete(id);
  }

  async crearPonente(ponente: PonenteEntity): Promise<PonenteEntity> {
    if (ponente.tipoPonenete === TipoPonente.INTERNO) {
      if (!ponente.email || !ponente.email.endsWith('.edu')) {
        throw new BadRequestException(
          'Si es Interno, el email debe terminar en .edu',
        );
      }
    } else if (ponente.tipoPonenete === TipoPonente.INVITADO) {
      const re = /^\S+@\S+\.\S+$/;
      if (!ponente.email || !re.test(ponente.email)) {
        throw new BadRequestException(
          'Si es Invitado, el email debe ser válido',
        );
      }
    }

    return this.ponenteRepository.save(ponente);
  }
}
