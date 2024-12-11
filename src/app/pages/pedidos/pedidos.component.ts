import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  productos: any[] = []; // Lista de productos desde el backend
  pedido = {
    producto: '', // Aquí se guarda el ID del producto seleccionado
    cantidad: 1,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // Cargar la lista de productos desde el backend
  cargarProductos(): void {
    this.http.get('http://localhost:3000/api/datos').subscribe(
      (response: any) => {
        console.log('Productos recibidos:', response); // Log para depuración
        this.productos = response; // Asignar la lista de productos
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  // Enviar el pedido al backend
  realizarPedido(): void {
    const userId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado

    if (!userId) {
      alert('Error: Usuario no autenticado');
      return;
    }

    // Validar que se haya seleccionado un producto
    if (!this.pedido.producto) {
      alert('Por favor, selecciona un producto.');
      return;
    }

    // Validar que la cantidad sea mayor a 0
    if (this.pedido.cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0.');
      return;
    }

    // Buscar el producto seleccionado para validar su stock
    const productoSeleccionado = this.productos.find(
      (prod) => prod.id === +this.pedido.producto // Convertir a número antes de comparar
    );

    if (!productoSeleccionado) {
      alert('El producto seleccionado no es válido.');
      return;
    }

    // Validar el stock del producto seleccionado
    if (this.pedido.cantidad > productoSeleccionado.stock) {
      alert(
        `No puedes pedir más de ${productoSeleccionado.stock} unidades de ${productoSeleccionado.nombre}.`
      );
      return;
    }

    // Construir el objeto del nuevo pedido
    const nuevoPedido = {
      usuario_id: userId,
      producto_id: productoSeleccionado.id, // Enviar el ID del producto
      cantidad: this.pedido.cantidad,
      fecha: new Date().toISOString().slice(0, 10), // Fecha actual (YYYY-MM-DD)
    };

    // Enviar el pedido al backend
    this.http.post('http://localhost:3000/api/pedidos', nuevoPedido).subscribe(
      (response) => {
        alert('Pedido realizado exitosamente');
        this.pedido = { producto: '', cantidad: 1 }; // Resetear el formulario
        this.cargarProductos(); // Refrescar la lista de productos
      },
      (error) => {
        console.error('Error al realizar el pedido:', error);
        alert('Hubo un error al realizar el pedido. Intenta de nuevo.');
      }
    );
  }
}
