import { Controller } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoEntity } from './evento.entity/evento.entity';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  
}
