import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit{
  // declarar un arreglo para guardar los nombres de los productos pero que solo se guarde el string del nombre
  nombreProducto: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<string[]>('http://localhost:3000/api/productos').subscribe(
      (response: any) => {
        this.nombreProducto = [];
        for (let i = 0; i < response.length; i++) {
          this.nombreProducto.push(response[i].nombre);
        }
        console.log(this.nombreProducto);
      },
      (error: any) => {
        console.error('Error al obtener los nombres de los productos', error);
      }
    );
  }
  

  pedido = {
    nombre: '',
    ci: '',
    celular: '',
    fecha: '',
    producto: '',
    cantidad: 1
  };

  submitForm() {
    const orden = {
      usuario_id: localStorage.getItem('userId'),
      nombreProducto: this.pedido.producto,
      fecha: this.pedido.fecha,
      cantidad: this.pedido.cantidad
    };
    console.log(this.pedido.producto);
    this.http.post<any>('http://localhost:3000/api/pedidos', orden).subscribe(
      response => {
        console.log(response); // Muestra la respuesta del backend en la consola
        // Aquí puedes mostrar un mensaje en el frontend para indicar que el pedido se guardó correctamente
        alert('Pedido guardado correctamente');

        // Se limpia el formulario
        this.pedido = {
          nombre: '',
          ci: '',
          celular: '',
          fecha: '',
          producto: '',
          cantidad: 1
        };
        // Se redirecciona a la página home
        window.location.href = '/home';
      },
      error => {
        console.error(error); // Muestra el error en la consola
        // Aquí puedes mostrar un mensaje de error en el frontend
        alert('Ocurrió un error al guardar el pedido');
        // Se limpia el formulario
        this.pedido = {
          nombre: '',
          ci: '',
          celular: '',
          fecha: '',
          producto: '',
          cantidad: 1
        };
      }
    );
  }
}
