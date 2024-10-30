import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  producto: any = {}; // Propiedad para almacenar los datos del producto

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // Obtener el ID del producto de los parámetros de la URL
    const productId = this.route.snapshot.paramMap.get('id');

    // Realizar la solicitud al backend para obtener los datos del producto por su ID
    this.http.get('http://localhost:3000/productos/' + productId).subscribe((data: any) => {
      this.producto = data; // Asignar los datos obtenidos al objeto producto
    });
  }

  submitForm() {
    // Realizar la solicitud al backend para guardar las modificaciones del producto
    this.http.put('http://localhost:3000/productos/' + this.producto.id, this.producto).subscribe((response: any) => {
      console.log('Producto actualizado exitosamente');
      alert('Producto actualizado exitosamente');
      // Realizar las acciones adicionales necesarias, como mostrar un mensaje de éxito, redireccionar, etc.
      // Redireccionar a la página de inventario
      window.location.href = '/inventario';
    });
  }
}
