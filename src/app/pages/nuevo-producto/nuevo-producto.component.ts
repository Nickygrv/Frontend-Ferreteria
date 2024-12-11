import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent {

  constructor(private http: HttpClient) { }

  datos = {
    nombre: '',
    imagen: '',
    descripcion: '',
    precio: 0,
    stock: 0
  };

  // Verificar que todos los campos requeridos están completos y son válidos
  formularioValido(): boolean {
    return (
      this.datos.nombre.trim() !== '' &&
      this.datos.imagen.trim() !== '' &&
      this.datos.precio > 0 &&
      this.datos.stock > 0
    );
  }

  submitForm() {
    if (!this.formularioValido()) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const producto = {
      nombre: this.datos.nombre,
      imagen: this.datos.imagen,
      descripcion: this.datos.descripcion,
      precio: this.datos.precio,
      stock: this.datos.stock
    };

    this.http.post<any>('http://localhost:3000/productos', producto).subscribe(
      response => {
        console.log(response); // Muestra la respuesta del backend en la consola
        // Aquí puedes mostrar un mensaje en el frontend para indicar que el producto se guardó correctamente
        alert('Producto guardado correctamente');
        // Se limpia el formulario
        this.datos = {
          nombre: '',
          imagen: '',
          descripcion: '',
          precio: 0,
          stock: 0
        };
        // Se redirecciona a la página de inventario
        window.location.href = '/inventario';
      },
      error => {
        console.error(error); // Muestra el error en la consola
        // Aquí puedes mostrar un mensaje de error en el frontend
        alert('Ocurrió un error al guardar el producto');
        // Se limpia el formulario
        this.datos = {
          nombre: '',
          imagen: '',
          descripcion: '',
          precio: 0,
          stock: 0
        };
      }
    );
  }
}
