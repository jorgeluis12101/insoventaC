import { Especificacion } from '../modelos/Especificacion';

export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  imagen: string;
  stock: number;
  especificacionesDisponibles?: Especificacion[];
  cantidad?: number; 
  especificacionIds?: number[];
}
  