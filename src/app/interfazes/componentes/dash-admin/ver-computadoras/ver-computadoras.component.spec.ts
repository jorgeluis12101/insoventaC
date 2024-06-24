import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComputadorasComponent } from './ver-computadoras.component';

describe('VerComputadorasComponent', () => {
  let component: VerComputadorasComponent;
  let fixture: ComponentFixture<VerComputadorasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerComputadorasComponent]
    });
    fixture = TestBed.createComponent(VerComputadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
