import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EspecificacionService } from 'src/app/servicio/especificacion.service';
import { Especificacion } from 'src/app/modelos/Especificacion';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-especificacion-lista',
  templateUrl: './especificacion-lista.component.html',
  styleUrls: ['./especificacion-lista.component.css']
})
export class EspecificacionListaComponent implements OnInit {
  especificaciones: Especificacion[] = [];
  nombreBusqueda: string = '';
  especificacion: Especificacion = {
    nombre: '',
    descripcion: '',
    precioAdicional: 0,
    marca: '',
    tipo: '',
    productoIds: [],
    cantidad: 0 
  };
  modalTitle: string = '';
  isEdit: boolean = false;

  @ViewChild('especificacionModal', { static: false }) especificacionModal!: ElementRef;

  constructor(private especificacionService: EspecificacionService) { }

  ngOnInit(): void {
    this.listarEspecificaciones();
  }

  listarEspecificaciones(): void {
    this.especificacionService.listarEspecificaciones().subscribe(
      especificaciones => this.especificaciones = especificaciones,
      error => console.error('Error al listar especificaciones', error)
    );
  }

  buscarEspecificaciones(): void {
    if (this.nombreBusqueda.length > 2) {
      this.especificacionService.buscarEspecificaciones(this.nombreBusqueda).subscribe(
        especificaciones => this.especificaciones = especificaciones,
        error => console.error('Error al buscar especificaciones', error)
      );
    } else {
      this.listarEspecificaciones();
    }
  }

  abrirModalRegistrar(): void {
    this.especificacion = {
      nombre: '',
      descripcion: '',
      precioAdicional: 0,
      marca: '',
      tipo: '',
      productoIds: [],
      cantidad: 0 
    };
    this.modalTitle = 'Agregar Especificación';
    this.isEdit = false;
    this.mostrarModal();
  }

  abrirModalEditar(especificacion: Especificacion): void {
    this.especificacion = { ...especificacion };
    this.modalTitle = 'Editar Especificación';
    this.isEdit = true;
    this.mostrarModal();
  }

  mostrarModal(): void {
    const modalElement = this.especificacionModal.nativeElement;
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('El modal de especificación no está definido');
    }
  }

  guardarEspecificacion(): void {
    if (this.isEdit) {
      this.especificacionService.actualizarEspecificacion(this.especificacion.id!, this.especificacion).subscribe({
        next: () => {
          this.cerrarModal();
          Swal.fire('Actualizado', 'La especificación ha sido actualizada', 'success');
          this.listarEspecificaciones();
        },
        error: (error) => {
          console.error('Error al actualizar la especificación', error);
          Swal.fire('Error', 'Hubo un problema al actualizar la especificación', 'error');
        }
      });
    } else {
      this.especificacionService.crearEspecificacion(this.especificacion).subscribe({
        next: () => {
          this.cerrarModal();
          Swal.fire('Registrado', 'La especificación ha sido registrada', 'success');
          this.listarEspecificaciones();
        },
        error: (error) => {
          console.error('Error al registrar la especificación', error);
          Swal.fire('Error', 'Hubo un problema al registrar la especificación', 'error');
        }
      });
    }
  }

  cerrarModal(): void {
    const modalElement = this.especificacionModal.nativeElement;
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  eliminarEspecificacion(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.especificacionService.eliminarEspecificacion(id).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado',
              'La especificación ha sido eliminada',
              'success'
            );
            this.listarEspecificaciones();
          },
          error: (error) => {
            console.error('Error al eliminar la especificación', error);
            let errorMessage = 'Hubo un problema al eliminar la especificación';
            if (error.status === 400 && error.error) {
              errorMessage = error.error;
            }
            Swal.fire('Error', errorMessage, 'error');
          }
        });
      }
    });
  }
}
