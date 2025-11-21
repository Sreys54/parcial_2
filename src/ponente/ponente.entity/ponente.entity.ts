/* eslint-disable prettier/prettier */
import { EventoEntity } from 'src/evento/evento.entity/evento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoPonente {
  INTERNO = 'Interno',
  INVITADO = 'Invitado',
}

@Entity()
export class PonenteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: TipoPonente,
    default: TipoPonente.INTERNO,
  })
  tipoPonenete: TipoPonente;

  @Column()
  especialidad: string;

  @OneToMany(() => EventoEntity, (evento) => evento.ponente)
  eventos: EventoEntity[];
}
