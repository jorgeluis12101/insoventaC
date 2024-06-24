import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../servicio/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  resetPasswordForm: FormGroup;
  validateTokenForm: FormGroup;
  updatePasswordForm: FormGroup;
  isLoginMode = true; // Alterna entre modo de inicio de sesión y registro

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      correo: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.validateTokenForm = this.fb.group({
      token: ['', Validators.required]
    });

    this.updatePasswordForm = this.fb.group({
      newPassword: ['', Validators.required]
    });
  }

  ngOnInit() {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, complete todos los campos correctamente.',
      });
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      () => {
        this.authService.getRole().subscribe(role => {
          if (role === 'ADMIN') {
            this.router.navigate(['/admin/ver-computadora']);
          } else {
            this.router.navigate(['/user/ver-catalogo']);
          }
        });
      },
      error => {
        console.error('Error al iniciar sesión', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Nombre de usuario o contraseña incorrectos.',
        });
      }
    );
  }

  onRegister() {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, complete todos los campos correctamente.',
      });
      return;
    }

    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada con éxito.',
        });
        this.router.navigate(['/login-registro']);
      },
      (error) => {
        console.error('Error al registrar', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Hubo un problema. Intenta nuevamente.',
        });
      }
    );
  }

  onSendResetEmail() {
    if (this.resetPasswordForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, ingresa un correo válido.',
      });
      return;
    }

    const email = this.resetPasswordForm.value.email;
    this.authService.resetPassword(email).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado',
          text: 'Revisa tu correo para restablecer tu contraseña.',
        });
        this.hideModal('resetPasswordModal');
        this.showModal('validateTokenModal');
      },
      (error) => {
        console.error('Error al restablecer contraseña', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al restablecer contraseña',
          text: 'Hubo un problema. Intenta nuevamente.',
        });
      }
    );
  }

  onValidateToken() {
    if (this.validateTokenForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, ingresa el código correctamente.',
      });
      return;
    }

    const { token } = this.validateTokenForm.value;
    const email = this.resetPasswordForm.value.email;  // Usa el email ingresado anteriormente
    this.authService.validateToken(email, token).subscribe(
      (isValid) => {
        if (isValid) {
          this.hideModal('validateTokenModal');
          this.showModal('updatePasswordModal');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Código inválido',
            text: 'El código de restablecimiento no es válido o ha expirado.',
          });
        }
      },
      (error) => {
        console.error('Error al validar el código', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al validar el código',
          text: 'Hubo un problema. Intenta nuevamente.',
        });
      }
    );
  }

  onUpdatePassword() {
    if (this.updatePasswordForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, ingresa la nueva contraseña correctamente.',
      });
      return;
    }

    const { newPassword } = this.updatePasswordForm.value;
    const email = this.resetPasswordForm.value.email;  // Usa el email ingresado anteriormente
    const token = this.validateTokenForm.value.token;  // Usa el token validado anteriormente
    this.authService.updatePassword(email, token, newPassword).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
          text: 'Tu contraseña ha sido actualizada exitosamente.',
        });
        this.hideModal('updatePasswordModal');
      },
      (error) => {
        console.error('Error al actualizar la contraseña', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la contraseña',
          text: 'Hubo un problema. Intenta nuevamente.',
        });
      }
    );
  }

  showModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  hideModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
