import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerInboxComponent } from './worker-inbox.component';

describe('WorkerInboxComponent', () => {
  let component: WorkerInboxComponent;
  let fixture: ComponentFixture<WorkerInboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerInboxComponent]
    });
    fixture = TestBed.createComponent(WorkerInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
