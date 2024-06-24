// src/app/modelos/Orden.ts
import { Producto } from './Producto';
import { EstadoOrden } from '../modelos/EstadoOrden';

export interface Orden {
  id?: number;
  usuarioId: number;
  productos: Producto[];
  fechaCreacion: string;
  estado: EstadoOrden;
  expandir?: boolean;
}
