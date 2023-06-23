import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuario } from 'src/app/models/usuario.interface';

@Component({
  selector: 'app-publicar-inmueble',
  templateUrl: './publicar-inmueble.component.html',
  styleUrls: ['./publicar-inmueble.component.scss']
})
export class PublicarInmuebleComponent {

  formPublicar!: FormGroup;
  isChecked: boolean[] = new Array(30).fill(false);

  onCheckboxChange(id: number) {
    if(this.isChecked[id]){
      this.isChecked[id] = false;
    }else{
      this.isChecked[id] = true;
    }
    //console.log('El estado del checkbox ' + id + ' es:', this.isChecked);
  }
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

  constructor(private formBuilder:FormBuilder, private inmuebleService:InmuebleService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar, private userservice:UsuarioService) {}

  ngOnInit(){
    this.reactiveForm();
  }

  reactiveForm():void {
    this.formPublicar = this.formBuilder.group({
        id:[""],
        id_propietario:[""],
        id_ubigeo:["",[Validators.required]],
        direccion:["",[Validators.required]],
        precio:["",[Validators.required]],
        n_dormitorios:["",[Validators.required]],
        n_banios:["",[Validators.required]],
        n_huespedes:["",[Validators.required]],
        m2_cuadrados:["",[Validators.required]],
        tiempo_antiguedad:["",[Validators.required]],
        link_fotos:[""],
        descripcion:[""],
        latitud:[""],
        longitud:[""],
        caracteristicas_inmueble:[""]
    });
  }

  publicarInmueble():void {

    const selectedIds: number[] = [];

    var contador: number = 1;
    this.isChecked.forEach(element => {
      if(element){
        selectedIds.push(contador);
      }
      contador++;
    });

    //console.log(selectedIds);

    const inmueble:inmueble = {
      id: parseInt(""),
      id_propietario: 18, //Usuario configurado por defecto
      id_ubigeo: this.formPublicar.get("id_ubigeo")!.value,
      direccion: this.formPublicar.get("direccion")!.value,
      tipo_inmueble:"",
      tipo_alojamiento:"",
      precio: parseFloat(this.formPublicar.get("precio")!.value),
      n_dormitorios: parseInt(this.formPublicar.get("n_dormitorios")!.value),
      n_banios: parseInt(this.formPublicar.get("n_banios")!.value),
      n_huespedes: parseInt(this.formPublicar.get("n_huespedes")!.value),
      m2_cuadrados: parseInt(this.formPublicar.get("m2_cuadrados")!.value),
      tiempo_antiguedad: this.formPublicar.get("tiempo_antiguedad")!.value,
      link_fotos: ["https://i.postimg.cc/CKMMbZ3m/364014549.webp",
                    "https://i.postimg.cc/FKqt17Nf/364014536.jpg",
                    "https://i.postimg.cc/m2S0CdTW/364014535.jpg"], //Insertar fotos
      descripcion: this.formPublicar.get("descripcion")!.value,
      latitud: "", //No se implementa aún
      longitud: "", //No se implementa aún
      caracteristicas_inmueble: selectedIds,
      calificacion:0
    }

    this.inmuebleService.addInmueble(inmueble).subscribe({
      next: (data)  => {
        this.router.navigate(["/home"]);
        this.snackBar.open("El inmueble se ingresó correctamente","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
  loadusersesion(){
    this.userservice.getUsuario(10).subscribe({
    next: (data)=>{
      this.usermain=data;
    },
    error: (err) => {
      console.log(err);
    },
  });
}

  volverHome():void {
    this.router.navigate(["/home"]);
  }

}
