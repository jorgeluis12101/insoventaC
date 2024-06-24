import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../modelos/Comentario';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  agregarComentario(comentario: Comentario, productoId: number): Observable<Comentario> {
    return this.http.post<Comentario>(`${baserUrl}/comentarios/agregar`, { ...comentario, producto: { id: productoId } });
  }

  listarComentariosPorProducto(productoId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${baserUrl}/comentarios/producto/${productoId}`);
  }

  editarComentario(id: number, usuarioId: number, contenido: string): Observable<Comentario> {
    return this.http.put<Comentario>(`${baserUrl}/comentarios/${id}`, { contenido });
  }

  eliminarComentario(id: number, usuarioId: number): Observable<void> {
    return this.http.delete<void>(`${baserUrl}/comentarios/${id}?usuarioId=${usuarioId}`);
  }
}
