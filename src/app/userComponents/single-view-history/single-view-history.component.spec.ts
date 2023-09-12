import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleViewHistoryComponent } from './single-view-history.component';

describe('SingleViewHistoryComponent', () => {
  let component: SingleViewHistoryComponent;
  let fixture: ComponentFixture<SingleViewHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleViewHistoryComponent]
    });
    fixture = TestBed.createComponent(SingleViewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
