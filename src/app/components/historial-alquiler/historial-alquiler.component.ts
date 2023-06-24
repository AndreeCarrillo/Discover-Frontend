import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { usuario } from 'src/app/models/usuario.interface';


export interface PeriodicElement {
  name: string;
  ubicacion: number;
  precio: number;
  date: string;
  activate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ubicacion: 1, name: 'Hydrogen', precio: 1.0079, date: 'H', activate: 'Si'},
  {ubicacion: 2, name: 'Helium', precio: 4.0026, date: 'He', activate: 'No'},
  {ubicacion: 3, name: 'Lithium', precio: 6.941, date: 'Li', activate: 'No'},
  {ubicacion: 4, name: 'Beryllium', precio: 9.0122, date: 'Be', activate: 'No'},
  {ubicacion: 5, name: 'Boron', precio: 10.811, date: 'B', activate: 'No'},
  {ubicacion: 6, name: 'Carbon', precio: 12.0107, date: 'C', activate: 'No'},
  {ubicacion: 7, name: 'Nitrogen', precio: 14.0067, date: 'N', activate: 'No'},
  {ubicacion: 8, name: 'Oxygen', precio: 15.9994, date: 'O', activate: 'No'},
  {ubicacion: 9, name: 'Fluorine', precio: 18.9984, date: 'F', activate: 'No'},
  {ubicacion: 10, name: 'Neon', precio: 20.1797, date: 'Ne', activate: 'No'},
];

@Component({
  selector: 'app-historial-alquiler',
  templateUrl: './historial-alquiler.component.html',
  styleUrls: ['./historial-alquiler.component.scss']
})

export class HistorialAlquilerComponent {
  displayedColumns: string[] = ['ubicacion', 'name', 'precio', 'date', 'activate', 'acciones'];
  dataSource = ELEMENT_DATA;
  constructor(private userservice:UsuarioService, private inmuebleservices:InmuebleService, private activedrouter:ActivatedRoute,  private router: Router) {
  }

  id!:number
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
