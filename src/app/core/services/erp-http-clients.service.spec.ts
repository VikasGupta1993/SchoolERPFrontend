import { TestBed } from '@angular/core/testing';

import { ErpHttpClientsService } from './erp-http-clients.service';

describe('ErpHttpClientsService', () => {
  let service: ErpHttpClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErpHttpClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
