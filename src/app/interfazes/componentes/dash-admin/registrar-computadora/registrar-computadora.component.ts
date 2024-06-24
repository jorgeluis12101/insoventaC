import { Component } from '@angular/core';
import { Producto } from 'src/app/modelos/Producto';
import { ProductoService } from 'src/app/servicio/producto.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog'; // Importar MatDialogRef

@Component({
  selector: 'app-registrar-computadora',
  templateUrl: './registrar-computadora.component.html',
  styleUrls: ['./registrar-computadora.component.css']
})
export class RegistrarComputadoraComponent {
  producto: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: '',
    stock: 0,
    especificacionIds: []
  };

  especificaciones: { id: number, nombre: string }[] = [];

  constructor(
    private productoService: ProductoService,
    public dialogRef: MatDialogRef<RegistrarComputadoraComponent> // Inyectar MatDialogRef
  ) { }

  ngOnInit(): void {
    this.cargarEspecificaciones();
    const descripcionInput = document.getElementById('descripcionProducto');
    const contadorCaracteres = document.getElementById('contador');

    if (descripcionInput && contadorCaracteres) {
      descripcionInput.addEventListener('input', () => {
        const caracteresRestantes = 5000 - (descripcionInput as HTMLTextAreaElement).value.length;
        contadorCaracteres.textContent = caracteresRestantes.toString();
        if (caracteresRestantes < 0) {
          contadorCaracteres.style.color = 'red';
        } else {
          contadorCaracteres.style.color = '';
        }
      });
    }
  }

  cargarEspecificaciones(): void {
    this.productoService.listarEspecificaciones().subscribe(especificaciones => {
      this.especificaciones = especificaciones;
    });
  }

  convertToBase64(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.producto.imagen = reader.result as string;
    };
    reader.onerror = error => {
      console.log('Error: ', error);
    };
  }

  registrarProducto(): void {
    this.productoService.registrarProducto(this.producto).subscribe({
      next: (response) => {
        Swal.fire(
          '¡Registrado!',
          'El producto ha sido registrado con éxito.',
          'success'
        ).then(() => {
          this.dialogRef.close('success'); // Emitir un resultado de éxito al cerrar
        });
      },
      error: (error) => {
        console.error('Error al registrar producto', error);
        let errorMessage = 'Hubo un problema al registrar el producto, intente nuevamente.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: errorMessage,
        });
      }
    });
  }
}
