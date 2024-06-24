import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EspecificacionService } from 'src/app/servicio/especificacion.service';
import { Especificacion } from 'src/app/modelos/Especificacion';

@Component({
  selector: 'app-especificacion-producto',
  templateUrl: './especificacion-producto.component.html',
  styleUrls: ['./especificacion-producto.component.css']
})
export class EspecificacionProductoComponent implements OnInit {
  especificacion: Especificacion = {
    nombre: '',
    descripcion: '',
    precioAdicional: 0,
    marca: '',
    tipo: '',
    productoIds: [],
    cantidad: 0 
  };
  sugerencias: Especificacion[] = [];

  constructor(private especificacionService: EspecificacionService) { }

  ngOnInit() {
    // Any necessary initialization
  }

  buscarSugerencias(): void {
    if (this.especificacion.nombre.length > 2) {
        this.especificacionService.buscarEspecificaciones(this.especificacion.nombre).subscribe(
            sugerencias => this.sugerencias = sugerencias,
            error => console.error('Error al buscar especificaciones', error)
        );
    } else {
        this.sugerencias = [];
    }
  }

  seleccionarSugerencia(sugerencia: Especificacion): void {
    this.especificacion.nombre = sugerencia.nombre;
    this.especificacion.descripcion = sugerencia.descripcion;
    this.especificacion.precioAdicional = sugerencia.precioAdicional;
    this.especificacion.marca = sugerencia.marca;
    this.especificacion.tipo = sugerencia.tipo;
    this.especificacion.productoIds = sugerencia.productoIds;
    this.sugerencias = [];
  }

  registrarEspecificacion() {
    this.especificacionService.crearEspecificacion(this.especificacion).subscribe({
      next: (especificacion) => {
        Swal.fire({
          title: '¡Registrado!',
          text: 'La especificación ha sido registrada con éxito.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.especificacion = { 
          nombre: '', 
          descripcion: '', 
          precioAdicional: 0, 
          marca: '', 
          tipo: '', 
          productoIds: [] ,
          cantidad: 0 
        };  // Reset the form
      },
      error: (error) => {
        console.error('Error al registrar la especificación:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar la especificación. Por favor, intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}
