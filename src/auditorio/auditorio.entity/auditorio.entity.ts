import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventoEntity } from 'src/evento/evento.entity/evento.entity';

@Entity()
export class AuditorioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

  @Column()
  ubicacion: string;

  @OneToMany(() => EventoEntity, (evento) => evento.auditorio)
  eventos: EventoEntity[];
}
