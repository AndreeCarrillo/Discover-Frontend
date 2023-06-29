import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { usuario } from 'src/app/models/usuario.interface';
import { userInformation } from 'src/app/models/dto/usuario';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { alquilerResponse } from 'src/app/models/dto/alquiler';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-historial-alquiler',
  templateUrl: './historial-alquiler.component.html',
  styleUrls: ['./historial-alquiler.component.scss']
})

export class HistorialAlquilerComponent {
  displayedColumns: string[] = ['location', 'fullNameOwner', 'price', 'transactionDate', 'active', 'acciones'];
  constructor(private userservice:UsuarioService, private inmuebleservices:InmuebleService, private activedrouter:ActivatedRoute,  private router: Router, private alquilerservice:AlquilerService) {
  }

  id!:number
  isActivate:Boolean = false;
  snackbar!:MatSnackBar;
  usermain: userInformation = {
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
  };
  listAlquiler!:alquilerResponse[];
  ngOnInit(){
    this.loadusersesion();
    this.getId();
  }
  getId():number{
    this.id = this.activedrouter.snapshot.params["id"];
    return this.id;
  }
  nombrecompleto():string{
    let nombre = 3;
    return nombre.toString();
  }
  loadusersesion(){
    let userLocalStorage = this.userservice.getCurrentUserId();

    let currentUserId = userLocalStorage != null ? userLocalStorage : 0;

    this.userservice.getUsuario(currentUserId).subscribe({
      next:(data)=>{
        this.usermain=data;
        this.load_alquileres();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  load_alquileres(){
    this.alquilerservice.getAlquilerXUsuario(this.usermain.id).subscribe({
      next:(data)=>{
        console.log(data);
        this.listAlquiler=data;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  activateAlquiler(bool:Boolean):string{
    let a="";
    if(bool){
      a="Activo";
      this.isActivate=true;
    }else{
      a="Inactivo"
      this.isActivate=false;
    }
    return a;
  }
  putActivateAlquiler( id:number){
    if(window.confirm("Estas seguro que quieres deshabilitar este alquiler?")){
      console.log(id)
    this.alquilerservice.putActivated(id).subscribe({
      next:(data)=>{
        this.load_alquileres();
      }
    })
    this.snackbar.open("Alquiler eliminado correctamente", "Aceptar", {
      duration:3500
    })
  }
    }
}
