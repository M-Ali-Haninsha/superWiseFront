import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChartAreaComponent } from './admin-chart-area.component';

describe('AdminChartAreaComponent', () => {
  let component: AdminChartAreaComponent;
  let fixture: ComponentFixture<AdminChartAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChartAreaComponent]
    });
    fixture = TestBed.createComponent(AdminChartAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
