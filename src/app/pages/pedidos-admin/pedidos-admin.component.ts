import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.css']
})
export class PedidosAdminComponent implements OnInit {
  pedidos: any[] = []; // Arreglo para almacenar los pedidos
  displayedColumns: string[] = ['numero', 'cliente', 'fecha', 'estado']; // Definir las columnas a mostrar

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerPedidos(); // Obtener los pedidos cuando el componente se inicializa
  }

  obtenerPedidos(): void {
    this.http.get('http://localhost:3000/api/pedidos').subscribe(
      (response: any) => {
        this.pedidos = response; // Asignar los pedidos a la variable pedidos
        console.log('Pedidos recibidos:', this.pedidos); // Verifica en consola que se obtienen los pedidos
      },
      (error) => {
        console.error('Error al obtener los pedidos', error);
      }
    );
  }
}
