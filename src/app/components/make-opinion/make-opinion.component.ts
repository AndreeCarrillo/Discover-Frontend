import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,FormGroup, FormControl} from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuario } from 'src/app/models/usuario.interface';
import { resena } from 'src/app/models/resena.interface';
import { ResenaService } from 'src/app/services/reseña.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-make-opinion',
  templateUrl: './make-opinion.component.html',
  styleUrls: ['./make-opinion.component.scss']
})

export class MakeOpinionComponent implements OnInit {
  myForm!:FormGroup;
  
  id:number=45;
  constructor(private _formBuilder: FormBuilder,private userservice:UsuarioService,private resenaservice:ResenaService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar) {
  }
 
  
  
  ngOnInit(){
    this.loadusersesion();
    this.reactiveForm();
    this.myForm = this._formBuilder.group({
      id:[""],
      descripcion:['',[Validators.required]],
      generalRating: ['', Validators.required],
      locationRating: ['', Validators.required],
      facilitiesRating: ['', Validators.required],
      securityRating: ['', Validators.required],
    });
  }
  
  reactiveForm():void {
    this.myForm = this._formBuilder.group({
      id:[""],
      descripcion:['',[Validators.required]]
    });
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    generalRating: ['', Validators.required],
    locationRating: ['', Validators.required],
    facilitiesRating: ['', Validators.required],
    securityRating: ['', Validators.required],
  });
  
  url = "https://i.postimg.cc/k5mRVLnk/84459.png";
  
  
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
  
  getRatingsAsJson() {
    const generalRating = +(this.secondFormGroup.get('generalRating')?.value || 0);
    const locationRating = +(this.secondFormGroup.get('locationRating')?.value || 0);
    const facilitiesRating = +(this.secondFormGroup.get('facilitiesRating')?.value || 0);
    const securityRating = +(this.secondFormGroup.get('securityRating')?.value || 0);
  
    const ratingsJson = {
      general: generalRating,
      location: locationRating,
      facilities: facilitiesRating,
      security: securityRating
    };
  
    console.log(ratingsJson);
    return ratingsJson;
  }
  
  
  calculateRatingAverage(ratings: { general: number; location: number; facilities: number; security: number }): number {
  const { general = 0, location = 0, facilities = 0, security = 0 } = ratings;
  const sum = general + location + facilities + security;
  const average = sum / 4;
  return average;
}

  
  
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
  saveresena():void{
    const ratings= this.getRatingsAsJson();
    var average:number= this.calculateRatingAverage(ratings);
    average = Math.ceil(average);
    console.log(average)
    console.log(this.usermain)
    console.log(this.myForm.get("descripcion")!.value);
    const resena:resena={
      id: this.id,
      id_inmueble:4 ,
      id_user: this.usermain.id,
      calificacion:average ,
      observaciones: this.myForm.get("descripcion")!.value,
      link_foto: this.url
    }
    console.log(this.id)
    console.log(resena.id_inmueble)
    console.log(resena.id_user)
    console.log(resena.calificacion)
    console.log(resena.observaciones)
    console.log(resena.link_foto)


    this.resenaservice.addresena(resena).subscribe({
      next: (data)  => {
        this.router.navigate(["/home"]);
        this.snackBar.open("La reseña se ha registrado correctamente","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
      }
    })
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
