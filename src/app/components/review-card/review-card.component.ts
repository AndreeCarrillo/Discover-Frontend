import { Component } from '@angular/core';
import { ResenaService } from 'src/app/services/resena.service';
import { usuario } from 'src/app/models/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {


  constructor(){
  }
}
