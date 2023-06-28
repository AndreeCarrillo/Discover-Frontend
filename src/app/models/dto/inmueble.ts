export interface allInmueblesResponse {
    id:number
    linkPhotoUser:string
    fullName:string
    province:string
    department:string
    district:string
    linkPhotoProperty:string
    price:number
    squareMeter:number
    numBedrooms:number
    numBathrooms:number
    description:string
}

export interface postInmueble {
    "propertyType": string
    "sharedRoom": string
    "address": string
    "price": number
    "numBedrooms": number
    "numBathrooms": number
    "numGuests": number
    "squareMeter": number
    "timeAntiquity": string
    "description": string
    "usuario_id": number
    "departamento": string
    "provincia": string
    "distrito": string
    "foto": string[],
    "caracteristicasIds": number[]
}

export interface getInmuebleId {
    "id":string
    "address": string
    "timeAntiquity": string
    "inmuebleFotoList": string[],
    "price": number,
    "numGuests": number,
    "listCaracteristaInmuebleIcons": [
        {
        "nombre": string
        "icon": string
        }
    ],
    "photoOwner": string,
    "numBedrooms": number,
    "numBathrooms": number,
    "squareMeter": number,
    "description": string,
    "listOpinions": [
        {
        "description": "string",
        "stars": number
        }
    ],
    "userContact": {
        "id": number,
        "fullName": string,
        "telephone": string,
        "email": string,
        "dateAfiiliation": string,
        "dateBirth": string,
        "linkFotoPerfil": string
    }
}