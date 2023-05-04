import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { caracteristica } from '../models/caracteristicas';


@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {

  ruta_servidor: string = "http://localhost:3000";
  recurso: string = "Caracteristicas";

  constructor(private http:HttpClient) { }

  getCaracteristicas(){
    return this.http.get<caracteristica[]>(this.ruta_servidor +"/"+ this.recurso)
  }
  getCaracteristica(id: number){
    return this.http.get<caracteristica>(this.ruta_servidor +"/"+ this.recurso + '/' + id.toString())
  }
  addCaracteristica(caracteristica:caracteristica){
    return this.http.post<caracteristica>(this.ruta_servidor +"/"+ this.recurso, caracteristica)
  }
  updateCaracteristica(id: number, caracteristica:caracteristica){
    return this.http.put<caracteristica>(this.ruta_servidor +"/"+ this.recurso + '/' + id.toString(), caracteristica)
  }
  deleteCaracteristica(id: number){
    return this.http.delete(this.ruta_servidor +"/"+ this.recurso + '/' + id.toString())
  }
}