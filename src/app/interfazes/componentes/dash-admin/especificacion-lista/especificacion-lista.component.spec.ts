import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecificacionListaComponent } from './especificacion-lista.component';

describe('EspecificacionListaComponent', () => {
  let component: EspecificacionListaComponent;
  let fixture: ComponentFixture<EspecificacionListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecificacionListaComponent]
    });
    fixture = TestBed.createComponent(EspecificacionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
