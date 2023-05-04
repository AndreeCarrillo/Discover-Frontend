import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,FormGroup, FormControl} from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuario } from 'src/app/models/usuario.interface';
import { ReseñaService } from 'src/app/services/reseña.service';
@Component({
  selector: 'app-make-opinion',
  templateUrl: './make-opinion.component.html',
  styleUrls: ['./make-opinion.component.scss']
})

export class MakeOpinionComponent implements OnInit {
  myForm!:FormGroup;
  id!:number;
  constructor(private _formBuilder: FormBuilder,private userservice:UsuarioService) {

  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  url = "https://i.postimg.cc/k5mRVLnk/84459.png";
  
  ngOnInit(){
    
    this.loadusersesion()
    
  }
  onselectFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(inputElement.files[0]);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = (event.target as FileReader).result;
        if (typeof result === 'string') {
          this.url = result;
        }
      }
    }
  }

  
  // saveresena():void{
  //   const resena:ReseñaService={
  //     // id: this.id,
  //     // id_inmueble: this.myForm.get("descripcion")!.value,
  //     // "id_user": number
  //     // "calificacion": number
  //     // "observaciones": string
  //     // "link_foto": string
  //   }
  // }
  
  
  

  isLinear = false;
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
}
