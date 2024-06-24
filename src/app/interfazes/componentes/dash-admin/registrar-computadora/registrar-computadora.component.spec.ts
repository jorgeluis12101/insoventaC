import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarComputadoraComponent } from './registrar-computadora.component';

describe('RegistrarComputadoraComponent', () => {
  let component: RegistrarComputadoraComponent;
  let fixture: ComponentFixture<RegistrarComputadoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarComputadoraComponent]
    });
    fixture = TestBed.createComponent(RegistrarComputadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
