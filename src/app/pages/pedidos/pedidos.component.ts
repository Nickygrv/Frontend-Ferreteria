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
    producto: '',
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

    // Buscar el stock del producto seleccionado
    const productoSeleccionado = this.productos.find(
      (prod) => prod.nombre === this.pedido.producto
    );

    if (this.pedido.cantidad > productoSeleccionado.stock) {
      alert(
        `No puedes pedir más de ${productoSeleccionado.stock} unidades de ${productoSeleccionado.nombre}.`
      );
      return;
    }

    const nuevoPedido = {
      usuario_id: userId,
      nombreProducto: this.pedido.producto,
      fecha: new Date().toISOString().slice(0, 10), // Fecha actual (YYYY-MM-DD)
      cantidad: this.pedido.cantidad,
    };

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
