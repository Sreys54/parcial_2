import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PonenteModule } from './ponente/ponente.module';
import { EventoModule } from './evento/evento.module';
import { AsistenteModule } from './asistente/asistente.module';
import { AuditorioModule } from './auditorio/auditorio.module';

@Module({
  imports: [PonenteModule, EventoModule, AsistenteModule, AuditorioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
