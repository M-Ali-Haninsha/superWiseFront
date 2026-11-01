import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from 'src/environments/environment';
import { authInterceptor } from '../core/auth.interceptor';
import { AuthService } from '../core/auth.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const url = environment.USER_URL;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    TestBed.inject(AuthService).login('user', 'client-token');
  });

  afterEach(() => httpMock.verify());

  it('sends the OTP as a string together with the email', () => {
    service.userOtp({ email: 'a@example.com', otp: '0123' }).subscribe();
    const req = httpMock.expectOne(url + 'userOtp');

    expect(req.request.body).toEqual({ email: 'a@example.com', otp: '0123' });
  });

  it('logs in without sending any token', () => {
    service.userLogin({ email: 'a@example.com', password: 'p' }).subscribe();
    expect(httpMock.expectOne(url + 'userLogin').request.headers.has('Authorization')).toBe(false);
  });

  it("calls client endpoints with the client's token", () => {
    service.fetchUserData().subscribe();
    expect(httpMock.expectOne(url + 'fetchUserData').request.headers.get('Authorization')).toBe(
      'Bearer client-token',
    );
  });

  it('creates a payment order with only the worker id (the server decides the amount)', () => {
    service.razorpay('w1').subscribe();
    expect(httpMock.expectOne(url + 'razorpay').request.body).toEqual({ workerId: 'w1' });
  });

  it('confirms a payment with the Razorpay checkout result', () => {
    const result = {
      razorpay_order_id: 'order_1',
      razorpay_payment_id: 'pay_1',
      razorpay_signature: 'sig',
    };
    service.verifyPayment('w1', result).subscribe();

    const req = httpMock.expectOne(url + 'razorpay/verify');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ workerId: 'w1', ...result });
  });

  it('sends a report reason as JSON', () => {
    service.reportWorkerCall('w1', 'No show').subscribe();
    expect(httpMock.expectOne(url + 'reportWorker/w1').request.body).toEqual({ reason: 'No show' });
  });
});
