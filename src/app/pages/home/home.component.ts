import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
	imports: [NgbCarouselModule, NgIf, MatCardModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  cards = [
    { title: 'Card 1', subtitle: '¡Mas vendido!', id: 1, content: 'Martillo', imageUrl: 'https://i.ibb.co/tC8SxgB/martillo.jpg', precio: 60},
    { title: 'Card 2', subtitle: '¡Mas vendido!', id: 2, content: 'Destornillador tipo plano', imageUrl: 'https://i.ibb.co/yhgBF1T/destornillador.png', precio: 50 },
    { title: 'Card 3', subtitle: '¡Mas vendido!', id: 3, content: 'Sierra para madera', imageUrl: 'https://i.ibb.co/FD2d7NR/sierra.jpg', precio: 70}
  ];
}
