import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WokerDialogComponent } from './woker-dialog.component';

describe('WokerDialogComponent', () => {
  let component: WokerDialogComponent;
  let fixture: ComponentFixture<WokerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WokerDialogComponent]
    });
    fixture = TestBed.createComponent(WokerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
