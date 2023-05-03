import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  resource_principal: string ="http://localhost:3000/"
  resource_user: string = "usuario"

  constructor(private http:HttpClient) { }
  getusersbyid(id: number){
    return this.http.get<usuario>(this.resource_principal + this.resource_user + "/" + id);
  }
}
