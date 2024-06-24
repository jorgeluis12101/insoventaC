import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';
import { Favorito } from '../modelos/Favorito';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  private apiUrl = `${baserUrl}/favoritos`;

  constructor(private http: HttpClient) { }

  agregarAFavoritos(usuarioId: number, productoId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agregar`, null, {
      params: {
        usuarioId: usuarioId.toString(),
        productoId: productoId.toString()
      }
    });
  }

  listarFavoritosPorUsuario(usuarioId: number): Observable<Favorito[]> {
    return this.http.get<Favorito[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }


  eliminarDeFavoritos(usuarioId: number, productoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuario/${usuarioId}/producto/${productoId}`);
  }
}
