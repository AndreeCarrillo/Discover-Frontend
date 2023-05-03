import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inmueble } from '../models/inmueble';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  ruta_servidor: string = "http://localhost:3000";
  recurso: string = "usuario";

  constructor(private http:HttpClient) { }

  getUsuarios(){
    return this.http.get<usuario[]>(this.ruta_servidor +"/"+ this.recurso);
  }
  getUsuario(id:number){
    return this.http.get<usuario>(this.ruta_servidor +"/"+ this.recurso + '/' + id.toString());
  }
  addUsuario(usuario:usuario){
    return this.http.post(this.ruta_servidor +"/"+ this.recurso, usuario);
  }
  updateUsuario(usuario:usuario){
    return this.http.put(this.ruta_servidor +"/"+ this.recurso+"/"+usuario.id.toString(), usuario);
  }
  deleteUsuario(id:number){
    return this.http.delete(this.ruta_servidor +"/"+ this.recurso + '/' + id.toString());
  }
}
