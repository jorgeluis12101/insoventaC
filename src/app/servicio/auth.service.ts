import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import baserUrl from './helper';

interface JwtPayload {
  id: number;
  username: string;
  role: string;
  userId: number;
}

export interface UsuarioDTO {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  dni: string;
  username: string;
  ordenes: any[];
  comentarios: any[];
  favoritos: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserRole = new BehaviorSubject<string>('');
  private currentUserName = new BehaviorSubject<string>('');  // Nuevo BehaviorSubject para el nombre de usuario

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  public login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${baserUrl}/usuario/login`, loginData).pipe(
      map((response: any) => {
        const token = response.token;
        this.setToken(token);
        const decodedToken = jwtDecode<JwtPayload>(token);
        this.currentUserRole.next(decodedToken.role);
        this.currentUserName.next(decodedToken.username);  // Almacenar el nombre de usuario
        return response;
      })
    );
  }

  public register(user: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${baserUrl}/usuario/registrar`, user, { headers });
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.currentUserRole.next('');
    this.currentUserName.next('');  // Limpiar el nombre de usuario
  }

  public getRole(): Observable<string> {
    return this.currentUserRole.asObservable();
  }

  public getUserName(): Observable<string> {  // Nuevo método para obtener el nombre de usuario
    return this.currentUserName.asObservable();
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      this.currentUserRole.next(decodedToken.role);
      this.currentUserName.next(decodedToken.username);  // Almacenar el nombre de usuario al verificar el token
      this.loggedIn.next(true);
    }
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public getUsuarioId(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      console.log('Token decodificado:', decoded); // Depuración
      return decoded.userId || null;
    }
    return null;
  }

  // Métodos para perfil de usuario
  public getPerfilUsuario(): Observable<UsuarioDTO> {
    const id = this.getUsuarioId();
    if (id === null) {
      throw new Error("Usuario no autenticado");
    }
    return this.http.get<UsuarioDTO>(`${baserUrl}/usuario/perfil/${id}`);
  }

  public updateUsuario(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    const id = this.getUsuarioId();
    if (id === null) {
      throw new Error("Usuario no autenticado");
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<UsuarioDTO>(`${baserUrl}/usuario/${id}`, usuario, { headers });
  }

  public deleteUsuario(): Observable<void> {
    const id = this.getUsuarioId();
    if (id === null) {
      throw new Error("Usuario no autenticado");
    }
    return this.http.delete<void>(`${baserUrl}/usuario/eliminar/${id}`);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${baserUrl}/password/reset`, { email }, { responseType: 'text' });
  }

  validateToken(email: string, token: string): Observable<boolean> {
    return this.http.post<boolean>(`${baserUrl}/password/validate`, { email, token });
  }

  updatePassword(email: string, token: string, newPassword: string): Observable<any> {
    const url = 'http://localhost:8080/password/update';
    const body = { email, token, newPassword };
    return this.http.post(url, body, { responseType: 'text' as 'json' });
}

}
