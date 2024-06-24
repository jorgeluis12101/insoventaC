import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesProductooComponent } from './detalles-producto.component';

describe('DetallesProductoComponent', () => {
  let component: DetallesProductooComponent;
  let fixture: ComponentFixture<DetallesProductooComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesProductooComponent]
    });
    fixture = TestBed.createComponent(DetallesProductooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
