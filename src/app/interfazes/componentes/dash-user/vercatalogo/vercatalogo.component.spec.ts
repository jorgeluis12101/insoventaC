import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../servicio/auth.service';
import { ProductoService } from '../../../../servicio/producto.service';
import { Producto } from 'src/app/modelos/Producto';
import Swal from 'sweetalert2';
import { OrdenService } from 'src/app/servicio/orden.service';
import { FavoritoService } from 'src/app/servicio/favorito.service'; // Importa el servicio de favoritos

@Component({
  selector: 'app-vercatalogo',
  templateUrl: './vercatalogo.component.html',
  styleUrls: ['./vercatalogo.component.css']
})
export class VercatalogoComponent implements OnInit {

  productos: Producto[] = [];
  filteredProductos: Producto[] = [];
  searchQuery: string = '';

  constructor(
    private productoService: ProductoService,
    private authService: AuthService,
    private ordenService: OrdenService,
    private favoritoService: FavoritoService // Añade el servicio de favoritos
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerCatalogoCompleto().subscribe({
      next: (productos) => {
        this.productos = this.filteredProductos = productos;
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
  }

  agregarAlCarrito(productoId: number): void {
    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes iniciar sesión para agregar productos al carrito.',
      });
      return;
    }

    this.ordenService.agregarProductoAlCarrito(usuarioId, productoId).subscribe({
      next: (respuesta) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Producto añadido al carrito exitosamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        if (error.status === 409) {
          Swal.fire({
            title: '¡Conflicto!',
            text: 'El producto ya está en el carrito.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Error al agregar al carrito: ' + error.message,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al agregar producto al carrito:', error);
        }
      }
    });
  }

  agregarAFavoritos(productoId: number): void {
    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes iniciar sesión para agregar productos a favoritos.',
      });
      return;
    }

    this.favoritoService.agregarAFavoritos(usuarioId, productoId).subscribe({
      next: (respuesta) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Producto añadido a favoritos exitosamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al agregar a favoritos: ' + error.message,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        console.error('Error al agregar producto a favoritos:', error);
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.productoService.buscarProductos(this.searchQuery).subscribe({
        next: (productos) => {
          this.filteredProductos = productos;
        },
        error: (error) => {
          console.error('Error al buscar productos:', error);
        }
      });
    } else {
      this.filteredProductos = this.productos; // Reset to all products when search is cleared
    }
  }  
}
