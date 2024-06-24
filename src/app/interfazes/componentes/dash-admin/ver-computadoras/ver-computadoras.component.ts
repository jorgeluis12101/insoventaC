import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelos/Producto'; // Asegúrate de tener la ruta correcta
import { ProductoService } from 'src/app/servicio/producto.service'; // Asegúrate de tener la ruta correcta
import { AuthService } from 'src/app/servicio/auth.service'; // Asegúrate de tener la ruta correcta
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog'; // Importar MatDialog
import { RegistrarComputadoraComponent } from '../registrar-computadora/registrar-computadora.component'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-ver-computadoras',
  templateUrl: './ver-computadoras.component.html',
  styleUrls: ['./ver-computadoras.component.css']
})
export class VerComputadorasComponent implements OnInit {
  productos: Producto[] = [];
  isAdmin: boolean = false;

  constructor(
    private productoService: ProductoService,
    private authService: AuthService,
    private dialog: MatDialog // Inyectar MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.authService.getRole().subscribe(role => {
      this.isAdmin = role === 'ADMIN';
    });
  }

  cargarProductos(): void {
    this.productoService.listarProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (error) => {
        console.error('Error al cargar los productos', error);
      }
    });
  }

  eliminarProducto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success')
              .then(() => {
                this.cargarProductos(); // Llama a cargarProductos para actualizar la lista
              });
          },
          error: (error) => {
            console.error('Error al eliminar el producto:', error);
            Swal.fire('Error!', 'No se pudo eliminar el producto.', 'error');
          }
        });
      }
    });
  }

  openRegistrarComputadoraModal(): void {
    const dialogRef = this.dialog.open(RegistrarComputadoraComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.cargarProductos(); // Actualizar la lista de productos si se registra una nueva computadora
      }
    });
  }
}
