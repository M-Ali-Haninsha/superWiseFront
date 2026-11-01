import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { asRole } from './http';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let auth: AuthService;
  const navigate = vi.fn();

  beforeEach(() => {
    sessionStorage.clear();
    navigate.mockReset();
    vi.spyOn(Swal, 'fire').mockResolvedValue({ isConfirmed: true } as SweetAlertResult);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: Router, useValue: { navigate } },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    auth = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
    vi.restoreAllMocks();
  });

  it('adds the bearer token of the requested role', () => {
    auth.login('worker', 'worker-token');
    http.get('/api/x', asRole('worker')).subscribe();

    expect(httpMock.expectOne('/api/x').request.headers.get('Authorization')).toBe('Bearer worker-token');
  });

  it('leaves public requests without an Authorization header', () => {
    auth.login('user', 'user-token');
    http.get('/api/public').subscribe();

    expect(httpMock.expectOne('/api/public').request.headers.has('Authorization')).toBe(false);
  });

  it('logs the role out and redirects to its login page on 401', async () => {
    auth.login('user', 'expired');
    http.get('/api/x', asRole('user')).subscribe({ error: () => undefined });
    httpMock.expectOne('/api/x').flush({ message: 'session has expired' }, { status: 401, statusText: 'Unauthorized' });

    expect(auth.isLoggedIn('user')).toBe(false);
    await vi.waitFor(() => expect(navigate).toHaveBeenCalledWith(['/userLogin']));
  });

  it('ends the session when the account is blocked', async () => {
    auth.login('worker', 't');
    http.get('/api/x', asRole('worker')).subscribe({ error: () => undefined });
    httpMock
      .expectOne('/api/x')
      .flush({ message: 'Your account has been blocked' }, { status: 403, statusText: 'Forbidden' });

    expect(auth.isLoggedIn('worker')).toBe(false);
    await vi.waitFor(() => expect(navigate).toHaveBeenCalledWith(['/workerLogin']));
  });

  it('passes other errors through without logging out', () => {
    auth.login('user', 't');
    let status = 0;
    http.get('/api/x', asRole('user')).subscribe({ error: (e: { status: number }) => (status = e.status) });
    httpMock.expectOne('/api/x').flush({ message: 'Already rated' }, { status: 409, statusText: 'Conflict' });

    expect(status).toBe(409);
    expect(auth.isLoggedIn('user')).toBe(true);
    expect(Swal.fire).not.toHaveBeenCalled();
  });
});
