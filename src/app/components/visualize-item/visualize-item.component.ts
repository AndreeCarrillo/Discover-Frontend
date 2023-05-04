import { Component, Input, OnInit } from '@angular/core';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { usuario } from 'src/app/models/usuario.interface';
import { ActivatedRoute } from '@angular/router';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CaracteristicasService } from 'src/app/services/caracteristicas.service';
import { caracteristica } from 'src/app/models/caracteristica';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  usermain!:usuario;
  user_property!:usuario;
  property!: inmueble;
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

  constructor(private userservice:UsuarioService ,private inmuebleservices:InmuebleService, private activedrouter:ActivatedRoute, private caracteristicasservices:CaracteristicasService){
  }

  ngOnInit(){
    this.loadusersesion();
    this.getId();
    this.load_property();
    this.loaduser_property();

  }

  getId():number{
    this.id = this.activedrouter.snapshot.params["id"];
    return this.id;
  }

  load_property(){
    this.inmuebleservices.getInmueble(this.getId()).subscribe({
      next:(data)=>{
        this.property=data;
        this.loadCaracteristicas();
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
        this.property.caracteristicas_inmueble.forEach(
          (caracteristicaid)=>{
            this.caracteristicasservices.getCaracteristica(caracteristicaid).subscribe({
              next:(data)=>{
                this.caracteristicas.push(data)

              }
            })
          }
        )
  }
  /*
    loadCaracteristicaServicio(){
    this.caractersitica_servicio=this.caracteristicas.filter((x)=>	x.tipo=="Servicios")
    console.log(this.caractersitica_servicio)
  }
  */






  loadusersesion(){
    this.userservice.getUsuario(18).subscribe({
      next: (data)=>{
        this.usermain=data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loaduser_property(){
    this.userservice.getUsuario(this.getId()).subscribe({
      next: (data) => {
        this.user_property=data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
