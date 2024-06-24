import { Component } from '@angular/core';

@Component({
  selector: 'app-parte1',
  templateUrl: './parte1.component.html',
  styleUrls: ['./parte1.component.css']
})
export class Parte1Component {
  productos = [
    {
      nombre: 'Laptop Gamer',
      descripcion: 'Potente laptop para juegos con la última tarjeta gráfica.',
      precio: 1500,
      imagen: '../../../../../assets/Producto1.webp'
    },
    {
      nombre: 'PC de Escritorio',
      descripcion: 'PC de escritorio para oficina con alta eficiencia.',
      precio: 800,
      imagen: '../../../../../assets/Producto2.webp'
    },
    {
      nombre: 'Monitor 4K',
      descripcion: 'Monitor 4K Ultra HD para la mejor experiencia visual.',
      precio: 300,
      imagen: '../../../../../assets/Producto3.webp'
    }
  ];

  ofertas = [
    {
      nombre: 'Laptop Gamer en Oferta',
      descripcion: 'Aprovecha esta oferta especial en nuestra laptop gamer.',
      precioOriginal: 1600,
      precioOferta: 1400,
      imagen: '../../../../../assets/Oferta2.webp'
    },
    {
      nombre: 'PC de Escritorio en Oferta',
      descripcion: 'PC de escritorio con descuento por tiempo limitado.',
      precioOriginal: 900,
      precioOferta: 750,
      imagen: '../../../../../assets/Oferta1.webp'
    },
    {
      nombre: 'Monitor 4K en Oferta',
      descripcion: 'Descuento en nuestro monitor 4K Ultra HD.',
      precioOriginal: 350,
      precioOferta: 250,
      imagen: '../../../../../assets/Oferta4.webp'
    }
  ];

  suscribirseAlBoletin(event: Event) {
    event.preventDefault();
    // Implementar lógica de suscripción aquí
    console.log('Usuario suscrito al boletín');
    alert('¡Gracias por suscribirse a nuestro boletín!');
  }
}
