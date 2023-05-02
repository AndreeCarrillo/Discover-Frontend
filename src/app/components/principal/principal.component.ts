import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  ex:string ="Luis Alberto"
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
  ] ;

}
