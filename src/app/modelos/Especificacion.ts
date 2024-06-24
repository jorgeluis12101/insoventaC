export interface Especificacion {
  id?: number;
  nombre: string;
  descripcion: string;
  precioAdicional: number;
  marca: string;
  tipo: string;
  productoIds: number[];
  cantidad: number;
}
