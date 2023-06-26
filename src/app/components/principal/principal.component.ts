import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { caracteristica } from 'src/app/models/caracteristicas';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { resena } from 'src/app/models/resena';
import { ubigeo } from 'src/app/models/ubigeo.interface';
import { usuario } from 'src/app/models/usuario.interface';
import { CaracteristicasService } from 'src/app/services/caracteristicas.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { ResenaService } from 'src/app/services/reseña.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { __values } from 'tslib';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit{
  property_Filter: string = "None";
  accommodation_Filter: string = "None";
  guests_Filter: number= 0;
  bedrooms_Filter: number = 0;
  bathrooms_Filter: number = 0;
  services_Filter: string[] = [];
  modcons_Filter: string[]= [];
  features_Filter: string[]= [];
  price_Filter: string = "None";
  filters:boolean = true;
  filtradosearch: inmueble[] = [];
  filtradofeatures: inmueble[] = [];
  sebusco: boolean = false;
  sefiltro: boolean = false;


  properties_array: string[] = [];
  accommodations_array: string[] = [];
  services_array: string[] =[];
  modcons_array: string[] = [];
  features_array: string[] = [];
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
  properties_filter!: inmueble[] ;

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
  ubigeo:ubigeo[] = []
  caracteristicas:caracteristica[]=[]

  constructor(private caracteristicasservice:CaracteristicasService ,private ubigeoservice:UbigeoService,private resenaservice:ResenaService,private userservice:UsuarioService ,private inmuebleservices:InmuebleService, private activedrouter:ActivatedRoute){

  }

  ngOnInit(){
    this.load_properties()
    this.loadreseñas()
    this.loadusersesion()
    this.define_calification_per_property()
    this.loadUbigeo()
  }
  load_properties(){
    this.inmuebleservices.getInmuebles().subscribe({
      next:(data)=>{
        this.properties=data;
        this.loadreseñas()
        this.define_randoms_values()
        this.loadcaracteristicas()
        this.properties_filter = data;
        this.filtradosearch = data;
        this.filtradofeatures=data;
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
  loadcaracteristicas(){
    this.caracteristicasservice.getCaracteristicas().subscribe({
      next: (data)=>{
        this.caracteristicas = data;
        this.definefiltersvalue();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  define_randoms_values(){
    console.log(this.properties.length)
    for(let i=0;i<3;i++){
      let randomNum = Math.floor(Math.random() * ((this.properties.length)-1));
      this.random_numbers.push(randomNum);
    }
  }
  loadreseñas(){
    this.resenaservice.get_reseñas().subscribe({
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
  loadUbigeo(){
    this.ubigeoservice.get_ubigeo().subscribe({
      next: (data)=>{
        this.ubigeo=data
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  filtersearch(event: Event) {
    if(this.sefiltro)
    {
      this.properties_filter=this.filtradofeatures
    } else {
      this.properties_filter = this.properties
    }
    this.filters=false
    const filter = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredProperties = [];

    for (const departamento of this.ubigeo) {
      for (const provincia of departamento.provincias) {
        for (const distrito of provincia.distritos) {
          if (
            distrito.nombre.toLowerCase().includes(filter) ||
            departamento.nombre.toLowerCase().includes(filter) ||
            provincia.nombre.toLowerCase().includes(filter)
          ) {
            for (const property of this.properties_filter) {
              if (property.id_ubigeo === distrito.ubigeo) {
                filteredProperties.push(property);
              }
            }
          }
        }
      }
    }
    this.filtradosearch=filteredProperties;
    this.sebusco=true;
    this.properties_filter = filteredProperties;
  }
  definefiltersvalue() {
    let uniqueTypes: string[] = [];
    this.properties.forEach((property) => {
      if (!uniqueTypes.includes(property.tipo_inmueble)) {
        uniqueTypes.push(property.tipo_inmueble);
      }
    });
    this.properties_array = uniqueTypes;
    uniqueTypes = [];
    this.properties.forEach((property) => {
      if (!uniqueTypes.includes(property.tipo_alojamiento)) {
        uniqueTypes.push(property.tipo_alojamiento);
      }
    });
    this.accommodations_array = uniqueTypes;
    uniqueTypes = [];
    this.properties.forEach((property) => {
      property.caracteristicas_inmueble.forEach((caracteristica) => {
        const caracteristicaString = caracteristica.toString();
        if (!uniqueTypes.includes(caracteristicaString)) {
          uniqueTypes.push(caracteristicaString);
        }
      });
    });
    uniqueTypes.forEach((caracteristica_id)=>{
      for(let car of this.caracteristicas){
        if(caracteristica_id == car.id.toString()){
          if(car.tipo=="Servicios"){
            this.services_array.push(car.nombre)
          } else if (car.tipo=="Comodidades"){
            this.modcons_array.push(car.nombre)
          } else if(car.tipo=="Caracteristicas del inmueble"){
            this.features_array.push(car.nombre)
          }
        }
      }
    })
  }
  applyFilter(){
    console.log(this.sebusco)
    if(this.sebusco){
      this.properties_filter=this.filtradosearch
    } else {
      this.properties_filter = this.properties;
    }
    this.filters=false
    if(this.property_Filter!='None'){
      let variable = this.properties_filter.filter((property)=>property.tipo_inmueble==this.property_Filter)
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if(this.accommodation_Filter!='None'){
      let variable = this.properties_filter.filter((property)=>property.tipo_alojamiento==this.accommodation_Filter)
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if(this.guests_Filter!=0){
      let variable = this.properties_filter.filter((property)=>property.n_huespedes>=this.guests_Filter)
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if(this.bedrooms_Filter!=0){
      let variable = this.properties_filter.filter((property)=>property.n_dormitorios>=this.bedrooms_Filter)
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if(this.bathrooms_Filter!=0){
      let variable = this.properties_filter.filter((property)=>property.n_banios>=this.bathrooms_Filter)
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.services_Filter.length != 0) {
      let variable = this.properties_filter.filter((property) => {
        let carac_nomb: string[] = []; // Inicializa como un arreglo vacío
        property.caracteristicas_inmueble.forEach((car_id) => {
          this.caracteristicas.forEach((carac) => {
            if (carac.id == car_id) {
              carac_nomb.push(carac.nombre);
            }
          });
        });
        return this.services_Filter.every((servicios) =>
          carac_nomb.includes(servicios)
        );
      });
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.modcons_Filter.length != 0) {
      let variable = this.properties_filter.filter((property) => {
        let com_nomb: string[] = []; // Inicializa como un arreglo vacío
        property.caracteristicas_inmueble.forEach((car_id) => {
          this.caracteristicas.forEach((carac) => {
            if (carac.id == car_id) {
              com_nomb.push(carac.nombre);
            }
          });
        });
        return this.modcons_Filter.every((servicios) =>
          com_nomb.includes(servicios)
        );
      });
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if (this.features_Filter.length != 0) {
      let variable = this.properties_filter.filter((property) => {
        let feat_nomb: string[] = []; // Inicializa como un arreglo vacío
        property.caracteristicas_inmueble.forEach((car_id) => {
          this.caracteristicas.forEach((carac) => {
            if (carac.id == car_id) {
              feat_nomb.push(carac.nombre);
            }
          });
        });
        return this.features_Filter.every((servicios) =>
          feat_nomb.includes(servicios)
        );
      });
      this.properties_filter = variable;
      this.sefiltro = true;
    }
    if(this.price_Filter!='None'){
      if(this.price_Filter=="desde S/0 hasta S/100"){
        console.log("PRUEBA")
      let variable = this.properties_filter.filter((property)=>(property.precio>0 && property.precio<=100))
      this.properties_filter = variable;
      }
      else if(this.price_Filter=="desde S/0 hasta S/100"){
        let variable = this.properties_filter.filter((property)=>(property.precio>0 && property.precio<=100))
        this.properties_filter = variable;
      }
      else if(this.price_Filter=="desde S/300 hasta S/700"){
        let variable = this.properties_filter.filter((property)=>(property.precio>300 && property.precio<=700))
        this.properties_filter = variable;
      }
      else if(this.price_Filter=="desde S/700 hasta S/1500"){
        let variable = this.properties_filter.filter((property)=>(property.precio>700 && property.precio<=1500))
        this.properties_filter = variable;
      }
      else if(this.price_Filter=="desde S/1500 hasta S/2500"){
        let variable = this.properties_filter.filter((property)=>(property.precio>1500 && property.precio<=2500))
        this.properties_filter = variable;
      }
      else if(this.price_Filter=="desde S/2500 hasta S/5000"){
        let variable = this.properties_filter.filter((property)=>(property.precio>2500 && property.precio<=5000))
        this.properties_filter = variable;
      }
      else if(this.price_Filter=="desde S/5000 hasta S/10000"){
        let variable = this.properties_filter.filter((property)=>(property.precio>5000 && property.precio<=10000))
        this.properties_filter = variable;
      }
      else if(this.price_Filter=="desde S/10000"){
        let variable = this.properties_filter.filter((property)=>(property.precio>10000))
        this.properties_filter = variable;
      }
    }
    this.filtradofeatures = this.properties_filter;
    this.sefiltro = true;
  }
  eliminarFilters(){
    this.filters=true;
    this.property_Filter='None';
    this.accommodation_Filter = 'None'
    this.price_Filter = 'None'
    this.services_Filter = [];
    this.modcons_Filter = [];
    this.features_Filter = [];
    this.guests_Filter= 0;
    this.bedrooms_Filter = 0;
    this.bathrooms_Filter = 0;
    this.filtradosearch = this.properties
    this.filtradofeatures = this.properties;
    this.sebusco = false;
    this.sefiltro = false;
  }
}
