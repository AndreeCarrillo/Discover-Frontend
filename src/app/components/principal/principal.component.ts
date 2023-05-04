import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { resena } from 'src/app/models/resena.interface';
import { usuario } from 'src/app/models/usuario.interface';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { ReseñaService } from 'src/app/services/reseña.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit{
  property_Filter!: string;
  accommodation_Filter!: string;
  guests_Filter: number= 0;
  bedrooms_Filter: number = 0;
  bathrooms_Filter: number = 0;
  services_Filter!: string[];
  modcons_Filter!: string[];
  features_Filter!: string[];
  price_Filter: number = 0;


  properties_array!: string[];
  accommodations_array!: string[];
  services_array: string[] =[
    "Wifi",
    "Food",
    "Jacuzzi",
    "Sillon Tantrico"
  ];
  modcons_array!: string[];
  features_array!: string[];
  price_array: string[] =[
    "desde S/0 hasta S/100",
    "desde S/100 hasta S/300",
    "desde S/300 hasta S/700",
    "desde S/700 hasta S/1500",
    "desde S/1500 hasta S/2500",
    "desde S/2500 hasta S/5000",
    "desde S/5000 hasta S/10000",
    "desde S/10000",
  ];
  properties: inmueble[] = [];
  reseñas: resena[]=[];
  properties_calificacion: inmueble[] = []

  random_numbers:number[] = []
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

  constructor(private reseñaservice:ReseñaService,private userservice:UsuarioService ,private inmuebleservices:InmuebleService, private activedrouter:ActivatedRoute){
  }

  ngOnInit(){
    this.load_properties()
    this.loadreseñas()
    this.loadusersesion()
    this.define_calification_per_property()
  }
  load_properties(){
    this.inmuebleservices.getInmuebles().subscribe({
      next:(data)=>{
        this.properties=data;
        this.loadreseñas()
        this.define_randoms_values()
      },
      error: (err)=>{
        console.log(err);
      }
    })
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
  define_randoms_values(){
    console.log(this.properties.length)
    for(let i=0;i<3;i++){
      let randomNum = Math.floor(Math.random() * ((this.properties.length)-1));
      this.random_numbers.push(randomNum);
    }
  }
  loadreseñas(){
    this.reseñaservice.get_reseñas().subscribe({
      next: (data)=>{
        this.reseñas=data;
        this.define_calification_per_property()
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  define_calification_per_property(){
    this.properties.forEach((property)=>{
      let cont = 0
      let sum = 0
      this.reseñas.forEach((resena)=>{
        if(resena.id_inmueble==property.id){
          cont++;
          sum = sum + resena.calificacion;
        }
        
      })
      property.calificacion=(sum/cont);
    })
    this.properties_calificacion = this.properties.sort((a,b)=>b.calificacion-a.calificacion)
  }
}
