import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedWorkersComponent } from './verified-workers.component';

describe('VerifiedWorkersComponent', () => {
  let component: VerifiedWorkersComponent;
  let fixture: ComponentFixture<VerifiedWorkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifiedWorkersComponent]
    });
    fixture = TestBed.createComponent(VerifiedWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
