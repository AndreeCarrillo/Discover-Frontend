import { Component, Input, OnInit } from '@angular/core';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { ubigeo } from 'src/app/models/ubigeo.interface';
import { usuario } from 'src/app/models/usuario.interface';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit{

  @Input() property!:inmueble;
  user!:usuario
  ubigeo!:ubigeo[]
  departament!:string;
  provincia!:string;
  district!:string;

  constructor(private usuarioservice: UsuarioService, private ubigeoservice:UbigeoService){
  }
  ngOnInit(): void {
    this.loadUser()
    this.loadUbigeo()
  }
  loadUser(){
    this.usuarioservice.getusersbyid(this.property.id_propietario).subscribe({
      next: (data)=>{
        this.user=data;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  loadUbigeo(){
    this.ubigeoservice.get_ubigeo().subscribe({
      next: (data)=>{
        this.ubigeo=data
        this.ubigeo.forEach((department)=>{
          department.provincias.forEach((provincia)=>{
            provincia.distritos.forEach((distrito)=>{
              if(distrito.ubigeo==this.property.id_ubigeo){
                this.departament=department.nombre
                this.provincia=provincia.nombre
                this.district=distrito.nombre
              }
            })
          })
        })
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
