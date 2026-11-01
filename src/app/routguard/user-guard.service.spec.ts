import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { UserGuardService } from './user-guard.service';

describe('UserGuardService', () => {
  let service: UserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(UserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
