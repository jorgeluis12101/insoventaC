import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashuser1Component } from './dashuser1.component';

describe('Dashuser1Component', () => {
  let component: Dashuser1Component;
  let fixture: ComponentFixture<Dashuser1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Dashuser1Component]
    });
    fixture = TestBed.createComponent(Dashuser1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
