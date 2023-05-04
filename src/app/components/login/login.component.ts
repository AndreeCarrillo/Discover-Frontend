import { usuario } from './../../models/usuario.interface';
import { PrincipalComponent } from './../principal/principal.component';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(private usuario:UsuarioService, private router:Router){}
  usuariomain:usuario = {
    "id": 8,
    "nombre": '',
    "apellido_paterno": '',
    "apellido_materno": '',
    "dni": '',
    "telefono": '',
    "correo": '',
    "password": '',
    "link_foto_dni": '',
    "link_foto_perfil": '',
    "fecha_nacimiento": '',
    "fecha_inscripcion": '',
  }

  ngOnInit(): void {
    this.getusuario;
  }

  getusuario()
  {
    this.usuario.getUsuario((Math.floor(Math.random()*(19)))).subscribe({
      next : (data) => {
        this.usuariomain = (data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  clickButton()
  {
    this.router.navigate(['/home']);
  }
}
