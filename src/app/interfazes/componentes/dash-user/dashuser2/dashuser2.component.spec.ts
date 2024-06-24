import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashuser2Component } from './dashuser2.component';

describe('Dashuser2Component', () => {
  let component: Dashuser2Component;
  let fixture: ComponentFixture<Dashuser2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Dashuser2Component]
    });
    fixture = TestBed.createComponent(Dashuser2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
