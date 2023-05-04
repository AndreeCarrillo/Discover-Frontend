import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/models/inmuebles.interface';

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

  constructor(private formBuilder:FormBuilder, private inmuebleService:InmuebleService, 
    private router: Router, private activatedRouter: ActivatedRoute, 
    private snackBar:MatSnackBar) {}

  ngOnInit(){
    this.reactiveForm();
  }
  
  reactiveForm():void {
    this.formPublicar = this.formBuilder.group({
        id:[""],
        id_propietario:[""],
        id_ubigeo:[""],
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
      id_ubigeo: 150101, //Ubigeo aleatorio
      direccion: this.formPublicar.get("direccion")!.value,
      precio: parseFloat(this.formPublicar.get("precio")!.value),
      n_dormitorios: parseInt(this.formPublicar.get("n_dormitorios")!.value),
      n_banios: parseInt(this.formPublicar.get("n_banios")!.value),
      n_huespedes: parseInt(this.formPublicar.get("n_huespedes")!.value),
      m2_cuadrados: parseInt(this.formPublicar.get("m2_cuadrados")!.value),
      tiempo_antiguedad: this.formPublicar.get("tiempo_antiguedad")!.value,
      link_fotos: ["Foto_01","Foto_02","Foto_03"], //Insertar fotos
      descripcion: this.formPublicar.get("descripcion")!.value,
      latitud: "", //No se implementa aún
      longitud: "", //No se implementa aún
      caracteristicas_inmueble: selectedIds
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

  volverHome():void {
    this.router.navigate(["/home"]);
  }

}
