import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOtpComponent } from './user-otp.component';

describe('UserOtpComponent', () => {
  let component: UserOtpComponent;
  let fixture: ComponentFixture<UserOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOtpComponent]
    });
    fixture = TestBed.createComponent(UserOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
