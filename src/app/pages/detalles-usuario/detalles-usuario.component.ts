import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-usuario',
  templateUrl: './detalles-usuario.component.html',
  styleUrls: ['./detalles-usuario.component.css']
})
export class DetallesUsuarioComponent implements OnInit {
  usuario: any;  // Guardará los detalles del usuario

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
 
  regresar() {
    this.router.navigate(['/lista-usuarios']);  // Redirige a la lista de usuarios
  }

 ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.http.get<any>(`http://localhost:3000/api/usuarios/detalles/${id}`).subscribe(
            data => {
                this.usuario = data;
            },
            error => {
                console.error('Error al obtener los detalles del usuario:', error);
            }
        );
    }
}

}
