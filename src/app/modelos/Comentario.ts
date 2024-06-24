// src/app/modelos/Comentario.ts
export interface Comentario {
    id?: number;
    contenido: string;
    usuarioId: number;
    productoId?: number;
    nombreUsuario?: string;
    fechaCreacion?: string;
  }
  