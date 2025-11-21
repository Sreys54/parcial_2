import { EventoEntity } from 'src/evento/evento.entity/evento.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AsistenteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigoEstudiante: string;

  @Column()
  email: string;

  @ManyToOne(() => EventoEntity, (evento) => evento.asistentes)
  evento: EventoEntity;
}
