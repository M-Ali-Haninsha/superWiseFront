import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerLoginComponent } from './worker-login.component';

describe('WorkerLoginComponent', () => {
  let component: WorkerLoginComponent;
  let fixture: ComponentFixture<WorkerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerLoginComponent]
    });
    fixture = TestBed.createComponent(WorkerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
