import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especificacion } from '../../app/modelos/Especificacion';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EspecificacionService {

  private apiBaseUrl = `${baseUrl}/especificaciones`;

  constructor(private http: HttpClient) { }

  listarEspecificaciones(): Observable<Especificacion[]> {
    return this.http.get<Especificacion[]>(`${this.apiBaseUrl}/listar`);
  }

  crearEspecificacion(especificacion: Especificacion): Observable<Especificacion> {
    return this.http.post<Especificacion>(`${this.apiBaseUrl}/registrar`, especificacion);
  }

  eliminarEspecificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/eliminar/${id}`);
  }

  buscarEspecificaciones(nombre: string): Observable<Especificacion[]> {
    return this.http.get<Especificacion[]>(`${this.apiBaseUrl}/buscar`, { params: { nombre } });
  }

  actualizarEspecificacion(id: number, especificacion: Especificacion): Observable<Especificacion> {
    return this.http.put<Especificacion>(`${this.apiBaseUrl}/actualizar/${id}`, especificacion);
  }

}
