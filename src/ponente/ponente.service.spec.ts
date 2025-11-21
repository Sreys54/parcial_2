import { Test, TestingModule } from '@nestjs/testing';
import { PonenteService } from './ponente.service';

describe('PonenteService', () => {
  let service: PonenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PonenteService],
    }).compile();

    service = module.get<PonenteService>(PonenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
