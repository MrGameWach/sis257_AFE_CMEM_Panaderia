import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoService } from './empleado.service';

describe('EmpleadoController', () => {
  let controller: EmpleadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpleadoController],
      providers: [EmpleadoService],
    }).compile();

    controller = module.get<EmpleadoController>(EmpleadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
