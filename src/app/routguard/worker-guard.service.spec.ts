import { TestBed } from '@angular/core/testing';

import { WorkerGuardService } from './worker-guard.service';

describe('WorkerGuardService', () => {
  let service: WorkerGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
