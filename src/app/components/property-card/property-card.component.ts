import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { allInmueblesResponse } from 'src/app/models/dto/inmueble';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { ubigeo } from 'src/app/models/ubigeo.interface';
import { usuario } from 'src/app/models/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit, OnChanges{

  @Input() property:allInmueblesResponse={
    id:0,
    linkPhotoUser:"",
    fullName:"",
    province:"",
    department:"",
    district:"",
    linkPhotoProperty:"",
    price:0,
    squareMeter:0,
    numBedrooms:0,
    numGuest:0,
    numBathrooms:0,
    description:"",
    properType:"",
    sharedRoom:"",
    caracteristicaList: [{
        featureType:"",
        featureName:""
    }]
  };
  user:usuario = {
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
  ubigeo:ubigeo[] = []
  departament!:string;
  provincia!:string;
  district!:string;

  constructor(private usuarioservice: UsuarioService){
  }
  ngOnInit(): void {
    
  }
  ngOnChanges(){
    this.loadUser()
    this.loadUbigeo()
  }
  loadUser(){
    // this.usuarioservice.getUsuario(this.property.id_propietario).subscribe({
    //   next: (data)=>{
    //     this.user=data;
    //   },
    //   error: (err)=>{
    //     console.log(err);
    //   }
    // })
  }
  loadUbigeo(){
    // this.ubigeoservice.get_ubigeo().subscribe({
    //   next: (data)=>{
    //     this.ubigeo=data
    //     this.ubigeo.forEach((department)=>{
    //       department.provincias.forEach((provincia)=>{
    //         provincia.distritos.forEach((distrito)=>{
    //           if(distrito.ubigeo==this.property.id_ubigeo){
    //             this.departament=department.nombre
    //             this.provincia=provincia.nombre
    //             this.district=distrito.nombre
    //           }
    //         })
    //       })
    //     })
    //   },
    //   error: (err)=>{
    //     console.log(err);
    //   }
    // })
  }
}
