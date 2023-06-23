import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuario } from 'src/app/models/usuario.interface';
import { Route } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent {

  id!:number;
  usermain:usuario = {
    "id": 0,
    "nombre": "",
    "apellido_paterno":  "",
    "apellido_materno":  "",
    "dni":  "",
    "telefono":  "",
    "correo":  "",
    "password":  "",
    "link_foto_dni":  "",
    "link_foto_perfil":  "",
    "fecha_nacimiento":  "",
    "fecha_inscripcion":  ""
  }

  constructor(private userservice:UsuarioService , private activedrouter:ActivatedRoute){

}

ngOnInit(){
  this.loadusersesion();
}
getId():number{
  this.id = this.activedrouter.snapshot.params["id"];
  return this.id;
}
nombrecompleto():string{
  let nombre = this.usermain.nombre+" "+ this.usermain.apellido_paterno+" "+this.usermain.apellido_materno;
  return nombre.toString();
}
loadusersesion(){
  this.userservice.getUsuario(this.getId()).subscribe({
  next: (data)=>{
    this.usermain=data;
  },
  error: (err) => {
    console.log(err);
  },
});
}
}
