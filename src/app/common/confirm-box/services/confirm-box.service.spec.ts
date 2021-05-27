import { TestBed } from '@angular/core/testing';

import { ConfirmBoxService } from './confirm-box.service';

describe('ConfirmBoxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmBoxService = TestBed.get(ConfirmBoxService);
    expect(service).toBeTruthy();
  });
});
