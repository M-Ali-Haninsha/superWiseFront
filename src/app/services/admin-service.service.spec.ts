import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from 'src/environments/environment';
import { authInterceptor } from '../core/auth.interceptor';
import { AuthService } from '../core/auth.service';
import { AdminServiceService } from './admin-service.service';

describe('AdminServiceService', () => {
  let service: AdminServiceService;
  let httpMock: HttpTestingController;
  const url = environment.ADMIN_URL;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });
    service = TestBed.inject(AdminServiceService);
    httpMock = TestBed.inject(HttpTestingController);
    TestBed.inject(AuthService).login('admin', 'admin-token');
  });

  afterEach(() => httpMock.verify());

  it("requests a signed proof link by worker id with the admin's token", () => {
    let link = '';
    service.viewProof('w1').subscribe(({ url: signed }) => (link = signed));

    const req = httpMock.expectOne(url + 'adminViewProof/w1');
    expect(req.request.headers.get('Authorization')).toBe('Bearer admin-token');
    req.flush({ url: 'https://signed.example/proof' });
    expect(link).toBe('https://signed.example/proof');
  });

  it('blocks a worker by id', () => {
    service.blockWorker('w1').subscribe();
    expect(httpMock.expectOne(url + 'adminBlockWorker').request.body).toEqual({ id: 'w1' });
  });

  it('verifies a worker by email', () => {
    service.acceptWorker('w@example.com').subscribe();
    expect(httpMock.expectOne(url + 'adminAccept').request.body).toEqual({ email: 'w@example.com' });
  });
});
