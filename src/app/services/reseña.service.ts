import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resena } from '../models/resena.interface';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {

  resource_principal: string ="http://localhost:3000/"
  resource_reseña: string = "resena"
  constructor(private http:HttpClient) { }
  addreseña(resena:resena){
    return this.http.post<resena>(this.resource_principal+"/"+this.resource_reseña, resena)
  }
  get_reseñas(){
    return this.http.get<resena[]>(this.resource_principal + this.resource_reseña)
  }
}
