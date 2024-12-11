import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

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

  minPrice: number = 0;
  maxPrice: number = 0;

  filterValue: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    let params = new HttpParams();
    if (this.minPrice > 0) {
      params = params.set('min', this.minPrice.toString());
    }
    if (this.maxPrice > 0) {
      params = params.set('max', this.maxPrice.toString());
    }
    if (this.filterValue.trim()) {
      params = params.set('filter', this.filterValue.trim().toLowerCase());
    }

    this.http
      .get('http://localhost:3000/api/productos-filtrados', { params })
      .subscribe((data: any) => {
        this.dataSource.data = data.products || [];
      });
  }

  applyPriceFilter() {
    if (this.minPrice < 0) this.minPrice = 0;
    if (this.maxPrice < 0) this.maxPrice = 0;
    this.loadProducts();
  }

  applySearchFilter(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterValue = searchTerm;

    if (searchTerm.trim() === '') {
      // Si el campo de búsqueda está vacío, recargamos todos los productos
      this.loadProducts();
    } else {
      // Si hay texto en el campo de búsqueda, filtramos los productos
      this.dataSource.data = this.dataSource.data.filter(product => {
        return (
          product.nombre.toLowerCase().includes(searchTerm) ||
          product.precio.toString().includes(searchTerm) ||
          product.id.toString().includes(searchTerm)
        );
      });
    }
  }
}
