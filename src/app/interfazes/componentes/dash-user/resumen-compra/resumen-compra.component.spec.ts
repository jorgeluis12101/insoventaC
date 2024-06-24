import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCompraComponent } from './resumen-compra.component';

describe('ResumenCompraComponent', () => {
  let component: ResumenCompraComponent;
  let fixture: ComponentFixture<ResumenCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenCompraComponent]
    });
    fixture = TestBed.createComponent(ResumenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
