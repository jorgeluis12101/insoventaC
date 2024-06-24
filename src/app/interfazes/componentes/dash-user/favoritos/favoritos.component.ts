import { Component, OnInit } from '@angular/core';
import { FavoritoService } from 'src/app/servicio/favorito.service';
import { AuthService } from 'src/app/servicio/auth.service';
import Swal from 'sweetalert2';
import { Favorito } from 'src/app/modelos/Favorito';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos: Favorito[] = [];

  constructor(private favoritoService: FavoritoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) {
      Swal.fire('Error', 'No se pudo obtener el ID del usuario. Por favor, inicie sesión nuevamente.', 'error');
      return;
    }

    this.favoritoService.listarFavoritosPorUsuario(usuarioId).subscribe({
      next: (data: Favorito[]) => {
        this.favoritos = data;
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudieron cargar los productos favoritos. Intente de nuevo más tarde.', 'error');
      }
    });
  }

  confirmarEliminarDeFavoritos(favoritoId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    });
  }

  
}
