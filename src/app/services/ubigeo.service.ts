import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ubigeo } from '../models/ubigeo.interface';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  resource_principal: string ="http://localhost:3000/"
  resource_ubigeo: string = "departamentos"
  constructor(private http:HttpClient) { }
  get_ubigeo(){
    return this.http.get<ubigeo[]>(this.resource_principal + this.resource_ubigeo)
  }
}
