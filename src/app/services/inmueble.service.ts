import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inmueble } from '../models/inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  ruta_servidor: string = "http://localhost:3000";
  recurso: string = "inmueble";

  constructor(private http:HttpClient) { }

  getInmueble(){
    return this.http.get<inmueble[]>(this.ruta_servidor+"/"+ this.recurso)
  }
  getInmuebles(id:number){
    return this.http.get<inmueble>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString())
  }
  addInmueble(inmueble:inmueble){
    return this.http.post<inmueble>(this.ruta_servidor+"/"+this.recurso, inmueble)
  }
  updateInmueble(id:number,inmueble:inmueble){
    return this.http.put<inmueble>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString(), inmueble)
  }
  deleteInmueble(id:number){
    return this.http.delete(this.ruta_servidor +"/"+this.recurso + "/" + id.toString());
  }
}