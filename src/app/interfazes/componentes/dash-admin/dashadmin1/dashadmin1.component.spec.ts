import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashadmin1Component } from './dashadmin1.component';

describe('Dashadmin1Component', () => {
  let component: Dashadmin1Component;
  let fixture: ComponentFixture<Dashadmin1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Dashadmin1Component]
    });
    fixture = TestBed.createComponent(Dashadmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
