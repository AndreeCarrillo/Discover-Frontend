import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inmueble } from '../models/inmuebles.interface';


@Injectable({
  providedIn: 'root'
})
export class InmueblesService {

  resource_principal: string ="http://localhost:3000/"
  resource_property: string = "inmuebles"
  constructor(private http:HttpClient) { }
  get_properties(){
    return this.http.get<inmueble[]>(this.resource_principal + this.resource_property)
  }
}
