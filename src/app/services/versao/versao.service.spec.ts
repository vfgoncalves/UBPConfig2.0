import { TestBed, inject } from '@angular/core/testing';

import { VersaoService } from './versao.service';

describe('VersaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VersaoService]
    });
  });

  it('should be created', inject([VersaoService], (service: VersaoService) => {
    expect(service).toBeTruthy();
  }));
});
