import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../../../servicio/orden.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {
  ordenes: any[] = [];
  resumen: any;
  pago: any = {};
  usuarioId: number = 0; // Inicializar con un valor predeterminado

  constructor(private ordenService: OrdenService) { }

  ngOnInit(): void {
    this.usuarioId = Number(localStorage.getItem('userId')); // Obtener usuarioId desde localStorage
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.ordenService.listarOrdenesPorUsuario(this.usuarioId).subscribe({
      next: (ordenes) => {
        console.log("Ordenes cargadas:", ordenes); // Añadir mensaje para verificar las órdenes cargadas
        this.ordenes = ordenes.sort((a: any, b: any) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
      },
      error: (error) => {
        console.error('Error al cargar las órdenes:', error);
        Swal.fire('Error', 'No se pudieron cargar las órdenes.', 'error');
      }
    });
  }

  mostrarResumen(ordenId: number): void {
    this.ordenService.obtenerResumenDeCompra(ordenId).subscribe({
      next: (resumen) => {
        console.log("Resumen recibido:", resumen); // Añadir mensaje para verificar el resumen recibido
        console.log("Estado de la orden:", resumen.estado); // Verificar el estado de la orden
        this.resumen = resumen;
        const modalElement = document.getElementById('resumenModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo cargar el resumen de la compra.', 'error');
      }
    });
  }


  realizarPago(): void {
    this.ordenService.realizarPago(this.pago).subscribe({
      next: () => {
        const modalElement = document.getElementById('pagoModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }
        Swal.fire('Éxito', 'El pago se ha realizado correctamente.', 'success');
        this.cargarOrdenes(); // Recargar las órdenes para actualizar el estado
      },
      error: (error) => {
        console.error('Error al realizar el pago:', error);
        Swal.fire('Error', 'Hubo un problema al procesar el pago.', 'error');
      }
    });
  }

  eliminarProductoDeLaOrden(ordenId: number, productoId: number): void {
    console.log("Intentando eliminar producto:", productoId, "de la orden:", ordenId); // Añadir mensaje para verificar la eliminación
    this.ordenService.eliminarProductoDeLaOrden(ordenId, productoId).subscribe({
      next: () => {
        Swal.fire('Eliminado', 'El producto ha sido eliminado de la orden.', 'success');
        this.mostrarResumen(ordenId); // Recargar el resumen de la orden
      },
      error: (error) => {
        console.error('Error al eliminar el producto de la orden:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el producto de la orden.', 'error');
      }
    });
  }

  formatearNumeroTarjeta(): void {
    // Remover todos los caracteres no numéricos
    let valor = this.pago.numeroTarjeta.replace(/\D/g, '');

    // Formatear el número de tarjeta en grupos de 4 dígitos separados por un guion
    if (valor.length > 0) {
      valor = valor.match(new RegExp('.{1,4}', 'g')).join('-');
    }

    this.pago.numeroTarjeta = valor;
  }

  formatearFechaExpiracion(): void {
    // Remover todos los caracteres no numéricos
    let valor = this.pago.fechaExpiracion.replace(/\D/g, '');

    // Formatear la fecha en MM/AAAA
    if (valor.length > 2) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }

    this.pago.fechaExpiracion = valor;
  }
}
