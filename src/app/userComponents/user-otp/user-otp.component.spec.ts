import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppModule } from '../../app.module';
import { AuthService } from 'src/app/core/auth.service';
import { UserOtpComponent } from './user-otp.component';

describe('UserOtpComponent', () => {
  let fixture: ComponentFixture<UserOtpComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('sends back to signup when there is no pending signup', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(UserOtpComponent);
    fixture.detectChanges();

    expect(navigate).toHaveBeenCalledWith(['/userSignup']);
  });

  it('keeps a leading zero in the OTP and sends the pending email', () => {
    TestBed.inject(AuthService).setPendingSignup('a@example.com');
    fixture = TestBed.createComponent(UserOtpComponent);
    fixture.detectChanges();

    fixture.componentInstance.otpForm.setValue({ otp1: '0', otp2: '1', otp3: '2', otp4: '3' });
    fixture.componentInstance.verify();

    const req = httpMock.expectOne(environment.USER_URL + 'userOtp');
    expect(req.request.body).toEqual({ email: 'a@example.com', otp: '0123' });
  });
});
