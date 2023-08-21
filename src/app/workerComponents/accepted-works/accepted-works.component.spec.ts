import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedWorksComponent } from './accepted-works.component';

describe('AcceptedWorksComponent', () => {
  let component: AcceptedWorksComponent;
  let fixture: ComponentFixture<AcceptedWorksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedWorksComponent]
    });
    fixture = TestBed.createComponent(AcceptedWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
