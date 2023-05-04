export interface inmueble {
    id: number;
    id_propietario: number;
    id_ubigeo: number;
    direccion: string;
    precio: number;
    n_dormitorios: number;
    n_banios: number;
    n_huespedes: number;
    m2_cuadrados: number;
    tiempo_antiguedad: string;
    link_fotos: string[];
    descripcion: string;
    latitud: string;
    longitud: string;
    caracteristicas_inmueble: number[];
    calificacion:number;
}
