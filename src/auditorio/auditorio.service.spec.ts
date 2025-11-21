import { Test, TestingModule } from '@nestjs/testing';
import { AuditorioService } from './auditorio.service';

describe('AuditorioService', () => {
  let service: AuditorioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditorioService],
    }).compile();

    service = module.get<AuditorioService>(AuditorioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
