import { Component, Input } from '@angular/core';
import { usuario } from 'src/app/models/usuario.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  @Input() usermain!:usuario;
}
