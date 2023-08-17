import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkerComponent } from './view-worker.component';

describe('ViewWorkerComponent', () => {
  let component: ViewWorkerComponent;
  let fixture: ComponentFixture<ViewWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewWorkerComponent]
    });
    fixture = TestBed.createComponent(ViewWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
