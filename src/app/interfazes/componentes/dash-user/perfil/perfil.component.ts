import { Component, OnInit } from '@angular/core';
import { AuthService, UsuarioDTO } from '../../../../servicio/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  editable = false;
  usuario: UsuarioDTO = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    dni: '',
    username: '',
    ordenes: [],
    comentarios: [],
    favoritos: []
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  habilitarEdicion() {
    this.editable = true;
  }

  guardarCambios() {
    this.authService.updateUsuario(this.usuario).subscribe({
      next: () => {
        this.editable = false;
        this.cargarPerfil(); // Volver a cargar el perfil actualizado
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
      }
    });
  }

  cancelarEdicion() {
    this.cargarPerfil();
    this.editable = false;
  }

  eliminarCuenta() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción es permanente y no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUsuario().subscribe(() => {
          this.authService.logout();
          this.router.navigate(['/home']); // Redirigir a la página de inicio después de eliminar la cuenta
          Swal.fire(
            'Eliminado!',
            'Tu cuenta ha sido eliminada.',
            'success'
          );
        });
      }
    });
  }

  private cargarPerfil() {
    this.authService.getPerfilUsuario().subscribe((data: UsuarioDTO) => {
      this.usuario = data;
    });
  }
}
