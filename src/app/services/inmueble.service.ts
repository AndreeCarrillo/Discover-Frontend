import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inmueble } from '../models/inmuebles.interface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class InmuebleService {
  ruta_servidor: string = `${environment.API_URL}`;
  recurso: string = 'inmuebles';

  constructor(private http: HttpClient) {}

  getInmuebles() {
    return this.http.get<inmueble[]>(this.ruta_servidor + '/' + this.recurso);
  }
  getInmueble(id: number) {
    return this.http.get<inmueble>(
      this.ruta_servidor + '/' + this.recurso + '/' + id.toString()
    );
  }
  addInmueble(inmueble: inmueble) {
    return this.http.post<inmueble>(
      this.ruta_servidor + '/' + this.recurso,
      inmueble
    );
  }
  updateInmueble(inmueble: inmueble) {
    return this.http.put<inmueble>(
      this.ruta_servidor + '/' + this.recurso + '/' + inmueble.id.toString(),
      inmueble
    );
  }
  deleteInmueble(id: number) {
    return this.http.delete(
      this.ruta_servidor + '/' + this.recurso + '/' + id.toString()
    );
  }
}
