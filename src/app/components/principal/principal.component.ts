import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inmueble } from 'src/app/models/inmuebles.interface';
import { usuario } from 'src/app/models/usuario.interface';
import { InmueblesService } from 'src/app/services/inmuebles.service';
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
  properties!: inmueble[];

  random_numbers:number[] = []
  usermain!:usuario

  constructor(private userservice:UsuarioService ,private inmuebleservices:InmueblesService, private activedrouter:ActivatedRoute){
  }

  ngOnInit(){
    this.load_properties()
    this.loadusersesion()
    this.define_randoms_values()
  }
  load_properties(){
    this.inmuebleservices.get_properties().subscribe({
      next:(data)=>{
        this.properties=data;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  loadusersesion(){
    this.userservice.getusersbyid(18).subscribe({
      next: (data)=>{
        this.usermain=data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  define_randoms_values(){
    for(let i=0;i<3;i++){
      let randomNum = Math.floor(Math.random() * 19);
      console.log(randomNum)
      this.random_numbers.push(randomNum);
    }
  }
}
