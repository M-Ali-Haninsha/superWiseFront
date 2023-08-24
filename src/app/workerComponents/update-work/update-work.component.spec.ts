import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkComponent } from './update-work.component';

describe('UpdateWorkComponent', () => {
  let component: UpdateWorkComponent;
  let fixture: ComponentFixture<UpdateWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateWorkComponent]
    });
    fixture = TestBed.createComponent(UpdateWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
