import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WokerSidenavComponent } from './woker-sidenav.component';

describe('WokerSidenavComponent', () => {
  let component: WokerSidenavComponent;
  let fixture: ComponentFixture<WokerSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WokerSidenavComponent]
    });
    fixture = TestBed.createComponent(WokerSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
