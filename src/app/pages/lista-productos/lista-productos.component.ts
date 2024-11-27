import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator'; // Importar PageEvent

export interface ProductList {
  id: number;
  nombre: string;
  precio: number;
}

const ELEMENT_DATA: ProductList[] = [];

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'precio'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // Variables para el rango de precios
  minPrice: number = 0;
  maxPrice: number = 0;

  // Paginación
  totalProducts: number = 0; // Total de productos
  pageSize: number = 10; // Tamaño de la página
  currentPage: number = 0; // Página actual

  // Filtro de búsqueda
  filterValue: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  // Cargar productos desde la API con paginación y filtros
  loadProducts() {
    const params = {
      min: this.minPrice.toString(),
      max: this.maxPrice.toString(),
      page: this.currentPage.toString(),
      size: this.pageSize.toString(),
      filter: this.filterValue.trim().toLowerCase(), // Agregar parámetro de búsqueda
    };

    this.http.get('http://localhost:3000/api/productos', { params }).subscribe((data: any) => {
      this.dataSource.data = data.products;  // Productos filtrados y paginados
      this.totalProducts = data.total;  // Total de productos
      console.log(data);
    });
  }

  // Filtrar productos por rango de precios
  applyPriceFilter() {
    this.currentPage = 0;  // Resetear la página cuando se aplica un filtro
    this.loadProducts();
  }

  // Manejar cambio de página
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();  // Volver a cargar los productos cuando la página cambia
  }

  // Filtrar por búsqueda
  applySearchFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 0;  // Resetear la página cuando se cambia la búsqueda
    this.loadProducts();
  }
}
