import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuario } from 'src/app/models/usuario.interface';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { userInformation } from 'src/app/models/dto/usuario';
import { getInmuebleId } from 'src/app/models/dto/inmueble';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { alquilerRequest } from 'src/app/models/dto/alquiler';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-make-alquiler',
  templateUrl: './make-alquiler.component.html',
  styleUrls: ['./make-alquiler.component.scss']
})
export class MakeAlquilerComponent {
  id!:number;


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
        "name": "",
        "apellidoPaterno":"",
        "apellidoMaterno":"",
        "telephone": "",
        "email": "",
        "dateAfiiliation": "",
        "dateBirth": "",
        "linkFotoPerfil": ""
    }
  };
  constructor(private userservice:UsuarioService, private inmuebleservices:InmuebleService,private alquilerservice:AlquilerService, private activedrouter:ActivatedRoute,  private router: Router,
    private snackBar:MatSnackBar) {
  }
  id_property:number=0;
  ngOnInit(){

    this.getId();
    this.load_property();
    this.loadusersesion();
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
        
        console.log(this.property)
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  
  loadusersesion(){
    let userLocalStorage = this.userservice.getCurrentUserId();

    let currentUserId = userLocalStorage != null ? userLocalStorage : 0;

    this.userservice.getUsuario(currentUserId).subscribe({
      next:(data)=>{
        this.usermain=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  nombrecompleto():string{
    let nombre = this.property.userContact.name+" "+ this.property.userContact.apellidoPaterno+" "+this.property.userContact.apellidoMaterno;
    return nombre.toString();
  }

  savealquiler():void{
    const alquiler:alquilerRequest={
      client_id:this.usermain.id,
      inmueble_id:this.id_property,
      price:this.property.price,
      transactionDate:new Date(Date.now())
    }
    this.alquilerservice.postAlquiler(alquiler).subscribe({
      next: (data)  => {
        this.snackBar.open("El alquiler se ha registrado correctamente","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
      }
    })
  };
}
