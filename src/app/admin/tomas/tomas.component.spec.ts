import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomasComponent } from './tomas.component';

describe('TomasComponent', () => {
  let component: TomasComponent;
  let fixture: ComponentFixture<TomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
