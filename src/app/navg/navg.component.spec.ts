import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavgComponent } from './navg.component';

describe('NavgComponent', () => {
  let component: NavgComponent;
  let fixture: ComponentFixture<NavgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
