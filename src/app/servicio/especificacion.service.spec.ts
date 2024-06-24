import { TestBed } from '@angular/core/testing';

import { EspecificacionService } from './especificacion.service';

describe('EspecificacionService', () => {
  let service: EspecificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
