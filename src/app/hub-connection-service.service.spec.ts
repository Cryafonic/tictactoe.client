import { TestBed } from '@angular/core/testing';

import { HubConnectionServiceService } from './hub-connection-service.service';

describe('HubConnectionServiceService', () => {
  let service: HubConnectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubConnectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
