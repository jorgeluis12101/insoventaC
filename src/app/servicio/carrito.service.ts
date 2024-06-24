// carrito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper'; // Asegúrate que esta es la ruta correcta
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  agregarProductoAlCarrito(productoId: number): Observable<any> {
    const url = `${baserUrl}/carrito/agregar`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const params = new HttpParams().set('productoId', productoId.toString());

    return this.http.post(url, null, {
      headers,
      params,
      responseType: 'text'  // Cambia aquí si esperas texto
    });
  }

  obtenerCarritoActual(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`${baserUrl}/carrito/actual`, { headers });
  }

  removerProductoDelCarrito(ordenId: number, productoId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const url = `${baserUrl}/carrito/remover/${ordenId}/${productoId}`;
    return this.http.delete(url, { headers, responseType: 'text' as 'json' });
  }




  finalizarCompra(ordenId: number): Observable<any> {
    return this.http.post(`${baserUrl}/carrito/finalizar/${ordenId}`, {});
  }

  // carrito.service.ts
  obtenerResumenDeCompra(ordenId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`${baserUrl}/carrito/resumen/${ordenId}`, { headers });
  }

  // En carrito.service.ts
  realizarPago(ordenId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const url = `${baserUrl}/carrito/pagar/${ordenId}`;
    return this.http.post(url, {}, { headers });
  }

  obtenerOrdenesDelUsuario(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`${baserUrl}/carrito/ordenes`, { headers });
  }


}
