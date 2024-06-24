import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../../../servicio/orden.service';
import { AuthService } from '../../../../servicio/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  ordenes: any[] = [];
  isLoading: boolean = false;
  tarjetaCredito: string = '';
  tarjetaCreditoError: string = '';
  cvv: string = '';
  cvvError: string = '';
  fechaExpiracion: string = '';
  fechaExpiracionError: string = '';
  metodoPago: string = 'Tarjeta de Crédito';
  montoTotal: number = 0;
  ordenIdParaPago: number | null = null;

  constructor(private ordenService: OrdenService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) {
      Swal.fire('Error', 'No se pudo obtener el ID del usuario. Por favor, inicie sesión nuevamente.', 'error');
      return;
    }

    this.ordenService.listarOrdenesPorUsuario(usuarioId).subscribe({
      next: (data) => {
        console.log('Ordenes:', data);
        this.ordenes = data.reverse().map(orden => ({ ...orden, expandir: false }));
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo cargar los datos del carrito. Intente de nuevo más tarde.', 'error');
      }
    });
  }

  validarNumeroTarjeta(): void {
    const regex = /^[0-9]{16}$/;
    if (!regex.test(this.tarjetaCredito)) {
      this.tarjetaCreditoError = 'El número de tarjeta debe tener 16 dígitos.';
    } else {
      this.tarjetaCreditoError = '';
    }
  }

  validarCVV(): void {
    const regex = /^[0-9]{3,4}$/;
    if (!regex.test(this.cvv)) {
      this.cvvError = 'El CVV debe tener 3 o 4 dígitos.';
    } else {
      this.cvvError = '';
    }
  }

  validarFechaExpiracion(): void {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(this.fechaExpiracion)) {
      this.fechaExpiracionError = 'La fecha de expiración debe tener el formato MM/AA.';
    } else {
      this.fechaExpiracionError = '';
    }
  }

  esFormularioValido(): boolean {
    return !this.tarjetaCreditoError && !this.cvvError && !this.fechaExpiracionError &&
           this.tarjetaCredito.length === 16 && this.cvv.length >= 3 && this.cvv.length <= 4 &&
           /^[0-9]{2}\/[0-9]{2}$/.test(this.fechaExpiracion);
  }

  removerProductoDeLaOrden(ordenId: number, productoId: number): void {
    if (!ordenId || !productoId) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El ID de la orden o del producto está indefinido.',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordenService.eliminarProductoDeLaOrden(ordenId, productoId).subscribe({
          next: (response) => {
            console.log('Producto eliminado:', response);
            Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminado del carrito.',
              'success'
            );
            this.cargarOrdenes();
          },
          error: (error) => {
            console.error('Error al eliminar el producto:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'No se pudo eliminar el producto del carrito.',
            });
          }
        });
      }
    });
  }

  eliminarOrden(ordenId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordenService.eliminarOrden(ordenId).subscribe({
          next: () => {
            console.log('Orden eliminada');
            Swal.fire(
              'Eliminado!',
              'La orden ha sido eliminada.',
              'success'
            );
            this.cargarOrdenes();
          },
          error: (error) => {
            console.error('Error al eliminar la orden:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'No se pudo eliminar la orden.',
            });
          }
        });
      }
    });
  }

  mostrarFormularioPago(ordenId: number, montoTotal: number): void {
    this.ordenIdParaPago = ordenId;
    this.montoTotal = montoTotal;
    this.tarjetaCredito = '';
    this.cvv = '';
    this.fechaExpiracion = '';
    const modal = document.getElementById('pagoModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  cerrarModal(): void {
    const modal = document.getElementById('pagoModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  realizarPago(): void {
    if (!this.ordenIdParaPago || !this.tarjetaCredito || !this.cvv || !this.fechaExpiracion) {
      Swal.fire('Error', 'Debe ingresar todos los datos de la tarjeta.', 'error');
      return;
    }

    const pago = {
      orden: { id: this.ordenIdParaPago },
      metodoPago: this.metodoPago
    };

    this.ordenService.realizarPago(pago).subscribe({
      next: (response) => {
        console.log('Pago realizado:', response);
        Swal.fire('Pago realizado', 'El pago se ha completado exitosamente.', 'success').then(() => {
          this.cerrarModal();
          this.cargarOrdenes();
        });
      },
      error: (error) => {
        console.error('Error al realizar el pago:', error);
        Swal.fire('Error de Pago', 'Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.', 'error');
      }
    });
  }

  descargarComprobante(ordenId: number): void {
    this.ordenService.descargarComprobante(ordenId).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'comprobante_pago.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error al descargar el comprobante:', error);
        Swal.fire('Error', 'Hubo un problema al descargar el comprobante. Por favor, inténtalo de nuevo.', 'error');
      }
    });
  }
}
