import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashadmin2Component } from './dashadmin2.component';

describe('Dashadmin2Component', () => {
  let component: Dashadmin2Component;
  let fixture: ComponentFixture<Dashadmin2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Dashadmin2Component]
    });
    fixture = TestBed.createComponent(Dashadmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
