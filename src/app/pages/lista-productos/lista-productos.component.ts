import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

export interface ProductList {
  id: number;
  nombre: string;
  precio: number;
}

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'precio'];
  dataSource = new MatTableDataSource<ProductList>([]);

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
    let params = new HttpParams();

    // Agregar parámetros de búsqueda
    if (this.minPrice > 0) { // Solo agregar minPrice si es mayor que 0
      params = params.set('min', this.minPrice.toString());
    }
    if (this.maxPrice > 0) { // Solo agregar maxPrice si es mayor que 0
      params = params.set('max', this.maxPrice.toString());
    }
    if (this.filterValue.trim()) {
      params = params.set('filter', this.filterValue.trim().toLowerCase());
    }

    // Agregar parámetros de paginación
    params = params.set('page', this.currentPage.toString());
    params = params.set('size', this.pageSize.toString());

    // Realizar la solicitud HTTP
    this.http
      .get('http://localhost:3000/api/productos-filtrados', { params })
      .subscribe(
        (data: any) => {
          this.dataSource.data = data.products || [];
          this.totalProducts = data.total || 0;
        },
        (error) => {
          console.error('Error al cargar los productos:', error);
          this.dataSource.data = [];
          this.totalProducts = 0;
        }
      );
  }

  // Filtrar productos por rango de precios
  applyPriceFilter() {
    this.currentPage = 0; // Resetear la página cuando se aplica un filtro

    // Verificar si los precios son válidos
    if (this.minPrice > 0 || this.maxPrice > 0) {
      this.loadProducts(); // Cargar productos con el filtro
    } else {
      alert('Por favor ingrese un rango de precios válido.');
      this.loadProducts(); // Cargar productos sin filtro
    }
  }

  // Manejar cambio de página
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts(); // Volver a cargar los productos cuando la página cambia
  }

  // Filtrar por búsqueda
  applySearchFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 0; // Resetear la página cuando se cambia la búsqueda
    this.loadProducts();
  }
}
