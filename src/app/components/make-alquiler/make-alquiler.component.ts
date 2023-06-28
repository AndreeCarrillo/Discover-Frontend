import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuario } from 'src/app/models/usuario.interface';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-make-alquiler',
  templateUrl: './make-alquiler.component.html',
  styleUrls: ['./make-alquiler.component.scss']
})
export class MakeAlquilerComponent {
  id!:number;

  constructor(private userservice:UsuarioService, private inmuebleservices:InmuebleService, private activedrouter:ActivatedRoute,  private router: Router) {
  }

  user_property!:usuario;
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
  property: inmueble={
    "id": 0,
    "id_propietario": 0,
    "id_ubigeo": 0,
    "tipo_inmueble":"",
    "tipo_alojamiento":"",
    "direccion": "",
    "precio": 0,
    "n_dormitorios": 0,
    "n_banios": 0,
    "n_huespedes": 0,
    "m2_cuadrados": 0,
    "tiempo_antiguedad": "",
    "link_fotos": [],
    "descripcion": "",
    "latitud": "",
    "longitud": "",
    "caracteristicas_inmueble": [],
    "calificacion": 0
  };
  id_property:number=0;
  ngOnInit(){

    this.getId();
    this.load_property();
  }
  getId():number{
    this.id = this.activedrouter.snapshot.params["id"];
    return this.id;
  }

  getIduser():number{
    this.id_property = this.property.id_propietario;
    return  this.id_property;
  }

  load_property(){
    // this.inmuebleservices.getInmueble(this.getId()).subscribe({
    //   next:(data)=>{
    //     this.property=data;
    //     this.getIduser();
    //     this.loaduser_property();
    //     this.loadusersesion();
    //     console.log(this.property)
    //   },
    //   error: (err)=>{
    //     console.log(err);
    //   }
    // })
  }
  loadusersesion(){
  //   this.userservice.getUsuario(10).subscribe({
  //   next: (data)=>{
  //     this.usermain=data;
  //   },
  //   error: (err) => {
  //     console.log(err);
  //   },
  // });
  }
  nombrecompleto():string{
    let nombre = this.user_property.nombre+" "+ this.user_property.apellido_paterno+" "+this.user_property.apellido_materno;
    return nombre.toString();
  }

  loaduser_property(){
    // console.log(this.property);
    // this.userservice.getUsuario(this.property.id_propietario).subscribe({
    //   next: (data) => {

    //     this.user_property=data;
    //     console.log(this.user_property)
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }
}
