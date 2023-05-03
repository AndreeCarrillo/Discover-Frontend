import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resena } from '../models/resena.interface';

@Injectable({
  providedIn: 'root'
})
export class ReseñaService {

  resource_principal: string ="http://localhost:3000/"
  resource_reseña: string = "resena"
  constructor(private http:HttpClient) { }
  get_reseñas(){
    return this.http.get<resena[]>(this.resource_principal + this.resource_reseña)
  }
}
