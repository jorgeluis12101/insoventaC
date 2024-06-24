import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecificacionProductoComponent } from './especificacion-producto.component';

describe('EspecificacionProductoComponent', () => {
  let component: EspecificacionProductoComponent;
  let fixture: ComponentFixture<EspecificacionProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecificacionProductoComponent]
    });
    fixture = TestBed.createComponent(EspecificacionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
