import { TestBed } from '@angular/core/testing';

import { IncidentsServicesService } from './incidents-services.service';

describe('IncidentsServicesService', () => {
  let service: IncidentsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
