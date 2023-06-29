import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuario } from 'src/app/models/usuario.interface';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { userInformation } from 'src/app/models/dto/usuario';
import { getInmuebleId } from 'src/app/models/dto/inmueble';
@Component({
  selector: 'app-make-alquiler',
  templateUrl: './make-alquiler.component.html',
  styleUrls: ['./make-alquiler.component.scss']
})
export class MakeAlquilerComponent {
  id!:number;

  

  // user_property!:usuario;
  usermain:userInformation = {
    id: 0,
    name: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dni: "",
    telephone: '',
    email: '',
    dateAfiiliation: '',
    dateBirth: '',
    linkFotoPerfil: '',
  }

  property: getInmuebleId={
    "id": 0,
    "address": "",
    "timeAntiquity": "",
    "inmuebleFotoList": [],
    "typeProperty":"",
    "price": 0,
    "numGuests": 0,
    "listCaracteristaInmuebleIcons": [],
    "photoOwner": "",
    "numBedrooms": 0,
    "numBathrooms": 0,
    "squareMeter": 0,
    "description": "",
    "listOpinions": [],
    "userContact": {
        "id": 0,
        "fullName": "",
        "telephone": "",
        "email": "",
        "dateAfiiliation": "",
        "dateBirth": "",
        "linkFotoPerfil": ""
    }
  };
  constructor(private userservice:UsuarioService, private inmuebleservices:InmuebleService, private activedrouter:ActivatedRoute,  private router: Router) {
  }
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
    this.id_property = this.property.userContact.id;
    return  this.id_property;
  }

  load_property(){
    this.inmuebleservices.getInmueble(this.id).subscribe({
      next:(data)=>{
        this.property=data;
        this.getIduser();
        this.loaduser_property();
        this.loadusersesion();
        console.log(this.property)
      },
      error: (err)=>{
        console.log(err);
      }
    })
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
    let nombre = this.usermain.name+" "+ this.usermain.apellidoPaterno+" "+this.usermain.apellidoMaterno;
    return nombre.toString();
  }

  loaduser_property(){
    console.log(this.property);
    this.userservice.getUsuario(this.property.userContact.id).subscribe({
      next: (data) => {
        this.usermain=data;
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
