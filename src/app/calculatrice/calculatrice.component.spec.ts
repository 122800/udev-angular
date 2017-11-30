import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C_Calculatrice } from './calculatrice.component';

describe('C_Calculatrice', () => {
  let component: C_Calculatrice;
  let fixture: ComponentFixture<C_Calculatrice>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C_Calculatrice ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C_Calculatrice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
