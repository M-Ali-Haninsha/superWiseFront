import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { WorkerGuard } from './worker-guard.service';

describe('WorkerGuard', () => {
  let service: WorkerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(WorkerGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
