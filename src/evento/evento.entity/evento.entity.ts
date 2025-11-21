import { AsistenteEntity } from 'src/asistente/asistente.entity/asistente.entity';
import { AuditorioEntity } from 'src/auditorio/auditorio.entity/auditorio.entity';
import { PonenteEntity } from 'src/ponente/ponente.entity/ponente.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Estado {
  PROPUESTO = 'Propuesto',
  APROBADO = 'Aprobado',
  RECHAZADO = 'Rechazado',
}

@Entity()
export class EventoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @Column()
  duracionHoras: number;

  @Column({
    type: 'enum',
    enum: Estado,
    default: Estado.PROPUESTO,
  })
  estado: Estado;

  @OneToMany(() => AsistenteEntity, (asistente) => asistente.evento)
  asistentes: AsistenteEntity[];
  @ManyToOne(() => AuditorioEntity, (auditorio) => auditorio.eventos)
  auditorio: AuditorioEntity;
  @ManyToOne(() => PonenteEntity, (ponente) => ponente.eventos)
  ponente: PonenteEntity;
}
