import { Component, Input, OnInit } from '@angular/core';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { usuario } from 'src/app/models/usuario.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CaracteristicasService } from 'src/app/services/caracteristicas.service';
import { caracteristica } from 'src/app/models/caracteristica';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resena } from 'src/app/models/resena';
import { userInformation } from 'src/app/models/dto/usuario';
import { getInmuebleId } from 'src/app/models/dto/inmueble';

export interface Photo {
  color: string;
  cols: number;
  rows: number;
  text: string;
  image: string;
  size: string;
  repeat:string;
  position:string;
}


@Component({
  selector: 'app-visualize-item',
  templateUrl: './visualize-item.component.html',
  styleUrls: ['./visualize-item.component.scss']
})
export class VisualizeItemComponent{

  id!:number;
  usermain!:userInformation;
  user_property!:usuario;
  EsPropietario:boolean=false;
  EsComentor:boolean=false;
  property: getInmuebleId={
    "id": 0,
    "address": "",
    "timeAntiquity": "",
    "inmuebleFotoList": [],
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

  id_property:number=0;
  resenas:resena[]=[]
  resenasInmueble:resena[]=[]
  caracteristicas:caracteristica[]=[]
  caractersitica_servicio:caracteristica[]=[]
  caracteristicas_caracteristica:caracteristica[]=[]
  caracteristicas_ids!:number[]
  photos: Photo[] = [
    {text: '', cols: 2, rows: 4, color: '#BEED3B', image:'url('+')', size:'cover', repeat:'no-repeat', position:'center'},
    {text: '', cols: 1, rows: 2, color: '#BEED3B', image:'url(https://i.postimg.cc/L5Trs99C/mk27-Casa-Lima-fernando-guerra-medium-jpeg-1.jpg)', size:'cover', repeat:'no-repeat', position:'center'},
    {text: '', cols: 1, rows: 2, color: '#BEED3B',image:'url(https://i.postimg.cc/qqRPDtHs/download.jpg)' , size:'cover', repeat:'no-repeat', position:'center'},
    {text: '', cols: 1, rows: 2, color: '#BEED3B', image:'url()', size:'cover', repeat:'no-repeat', position:'center'},
    {text: '', cols: 1, rows: 2, color: '#BEED3B', image:'url()', size:'cover', repeat:'no-repeat', position:'center'},

  ];

  constructor(private userservice:UsuarioService ,private inmuebleservices:InmuebleService, private activedrouter:ActivatedRoute,
    private caracteristicasservices:CaracteristicasService, /*private resenaservice: ResenaService,*/ private router: Router, private sanckbar:MatSnackBar){
  }

  ngOnInit(){

    this.getId();
    this.load_property();
  }

  getId(){
    this.id = this.activedrouter.snapshot.params["id"];
  }

  getIduser(){
    // this.id_property = this.property.id_propietario;
    // return this.id_property;
  }

  load_property(){
    this.inmuebleservices.getInmueble(this.id).subscribe({
      next:(data)=>{
        this.property=data;
        this.loadUserSesion();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }


nombrecompleto():string{
  let nombre = this.user_property.nombre+" "+ this.user_property.apellido_paterno+" "+this.user_property.apellido_materno;
  return nombre.toString();
}

loadCaracteristicas(){
        // this.property.caracteristicas_inmueble.forEach(
        //   (caracteristicaid)=>{
        //     this.caracteristicasservices.getCaracteristica(caracteristicaid).subscribe({
        //       next:(data)=>{
        //         this.caracteristicas.push(data)

        //       }
        //     })
        //   }
        // )
        // console.log(this.caracteristicas)
  }
  loadUserSesion() {
    let userLocalStorage = this.userservice.getCurrentUserId();

    let currentUserId = userLocalStorage != null ? userLocalStorage : 0;

    this.userservice.getUsuario(currentUserId).subscribe({
      next:(data)=>{
        this.usermain=data;
        this.BorrarInmueble();
      },
      error:(err)=>{
        console.log(err);
      }
    })
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


  BorrarInmueble(){
    if(this.property.userContact.id==this.usermain.id){
      this.EsPropietario=true;
    }
  }


  DeleteInmueble(){
    this.inmuebleservices.deleteInmueble(this.property.id).subscribe({
      next: (data) => {
        //this.load_property();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.sanckbar.open("El inmueble se ha eliminado correctamente","OK",{duration:3000});
  }

}
