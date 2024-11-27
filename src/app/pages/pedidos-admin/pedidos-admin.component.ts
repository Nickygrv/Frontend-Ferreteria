import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.css']
})
export class PedidosAdminComponent implements OnInit {
  pedidos: any[] = []; // Arreglo para almacenar los pedidos
  displayedColumns: string[] = ['pedido_id', 'nombre_usuario', 'nombre_producto', 'fecha', 'estado']; // Definir las columnas a mostrar
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // Inicializa dataSource con un valor por defecto

  searchTerm: string = ''; // Término de búsqueda
  startDateValue: Date | null = null; // Fecha de inicio
  endDateValue: Date | null = null; // Fecha de fin

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerPedidos(); // Obtener los pedidos cuando el componente se inicializa
  }

  obtenerPedidos(): void {
    this.http.get('http://localhost:3000/api/pedidos').subscribe(
      (response: any) => {
        this.pedidos = response; // Asignar los pedidos a la variable pedidos
        this.dataSource = new MatTableDataSource(this.pedidos); // Asignar los pedidos a la fuente de datos
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al obtener los pedidos', error);
      }
    );
  }

  // Función para validar que la fecha de inicio no sea mayor a la fecha de fin
  validarFechaInicio = (fecha: Date | null): boolean => {
    if (!fecha || !this.endDateValue) {
      return true; // Permite todas las fechas si no hay fecha de fin seleccionada
    }
    return fecha <= new Date(this.endDateValue); // Fecha de inicio debe ser menor o igual a la de fin
  };

  // Función para validar que la fecha de fin no sea menor a la fecha de inicio
  validarFechaFin = (fecha: Date | null): boolean => {
    if (!fecha || !this.startDateValue) {
      return true; // Permite todas las fechas si no hay fecha de inicio seleccionada
    }
    return fecha >= new Date(this.startDateValue); // Fecha de fin debe ser mayor o igual a la de inicio
  };

  // Función para validar el rango completo de fechas
  validarRangoFechas(): boolean {
    if (this.startDateValue && this.endDateValue) {
      return new Date(this.startDateValue) <= new Date(this.endDateValue); // Valida que inicio <= fin
    }
    return true; // Si alguna fecha no está seleccionada, no se muestra el mensaje
  }

  // Función para aplicar los filtros
  applyFilter(): void {
    // Validar el rango de fechas antes de filtrar
    if (!this.validarRangoFechas()) {
      console.warn('Rango de fechas inválido: la fecha de inicio es posterior a la fecha de fin.');
      return; // No aplica el filtro si las fechas son inválidas
    }

    let filteredData = this.pedidos;

    // Filtro por término de búsqueda
    if (this.searchTerm) {
      filteredData = filteredData.filter(pedido =>
        pedido.pedido_id.toString().includes(this.searchTerm) ||
        pedido.nombre_usuario.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pedido.nombre_producto.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filtro por fecha de inicio
    if (this.startDateValue) {
      filteredData = filteredData.filter(pedido =>
        new Date(pedido.fecha) >= new Date(this.startDateValue!)
      );
    }

    // Filtro por fecha de fin
    if (this.endDateValue) {
      filteredData = filteredData.filter(pedido =>
        new Date(pedido.fecha) <= new Date(this.endDateValue!)
      );
    }

    // Actualizar la fuente de datos con los resultados filtrados
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
