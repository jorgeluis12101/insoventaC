import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/servicio/producto.service';
import { Producto } from 'src/app/modelos/Producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {
  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    stock: 0,
    especificacionesDisponibles: []
  };

  nuevaEspecificacionNombre: string = '';
  nuevaEspecificacionCantidad: number = 1;
  especificacionesEncontradas: { id: number, nombre: string, precioAdicional: number, descripcion: string }[] = [];
  especificacionSeleccionadaId: number | null = null;

  constructor(private productoService: ProductoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productoService.obtenerDetallesDelProducto(id).subscribe({
        next: (producto) => {
          this.producto = producto;
        },
        error: (error) => {
          console.error('Error al cargar el producto', error);
        }
      });
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.producto.imagen = reader.result as string;
    };
  }

  editarProducto() {
    if (this.producto.id !== undefined) {
      this.productoService.editarProducto(this.producto.id, this.producto).subscribe({
        next: (productoActualizado) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'El producto ha sido actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar el producto. Por favor, intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'El ID del producto no está definido. No se puede actualizar el producto.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  }

  buscarEspecificaciones() {
    if (this.nuevaEspecificacionNombre.length > 2) {
      this.productoService.buscarEspecificacionesPorNombre(this.nuevaEspecificacionNombre).subscribe({
        next: (especificaciones: { id: number, nombre: string, precioAdicional: number }[]) => {
          this.especificacionesEncontradas = especificaciones.map(espec => ({
            ...espec,
            descripcion: ''
          }));
        },
        error: (error) => {
          console.error('Error al buscar especificaciones', error);
        }
      });
      
    } else {
      this.especificacionesEncontradas = [];
    }
  }

  seleccionarEspecificacion(especificacion: { id: number, nombre: string, precioAdicional: number, descripcion: string }) {
    this.especificacionSeleccionadaId = especificacion.id;
    this.nuevaEspecificacionNombre = especificacion.nombre;
    this.nuevaEspecificacionCantidad = 1; // Restablecer cantidad a 1 al seleccionar una nueva especificación
  }

  agregarEspecificacion() {
    if (this.producto.id !== undefined && this.especificacionSeleccionadaId !== null && this.nuevaEspecificacionCantidad > 0) {
      const especificacionSeleccionada = this.especificacionesEncontradas.find(espec => espec.id === this.especificacionSeleccionadaId);
      if (especificacionSeleccionada) {
        this.productoService.agregarEspecificacion(this.producto.id, this.especificacionSeleccionadaId, this.nuevaEspecificacionCantidad).subscribe({
          next: (productoActualizado) => {
            this.productoService.obtenerDetallesDelProducto(this.producto.id!).subscribe({
              next: (producto) => {
                this.producto = producto;
                this.nuevaEspecificacionNombre = '';
                this.nuevaEspecificacionCantidad = 1;
                this.especificacionesEncontradas = [];
                this.especificacionSeleccionadaId = null;
                Swal.fire({
                  title: '¡Éxito!',
                  text: 'Especificación agregada correctamente.',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
              },
              error: (error) => {
                console.error('Error al actualizar el producto después de agregar la especificación', error);
              }
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al agregar la especificación. Por favor, intenta nuevamente.',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          }
        });
      }
    }
  }

  eliminarEspecificacion(especificacionId: number) {
    if (this.producto.id !== undefined && especificacionId !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productoService.eliminarEspecificacion(this.producto.id!, especificacionId).subscribe({
            next: (productoActualizado) => {
              this.productoService.obtenerDetallesDelProducto(this.producto.id!).subscribe({
                next: (producto) => {
                  this.producto = producto;
                  Swal.fire({
                    title: '¡Éxito!',
                    text: 'Especificación eliminada correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                },
                error: (error) => {
                  console.error('Error al actualizar el producto después de eliminar la especificación', error);
                }
              });
            },
            error: (error) => {
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar la especificación. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
              });
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'ID del producto o de la especificación no está definido. No se puede eliminar la especificación.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  }
}
