import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeExito(titulo: string, mensaje: string){
  Swal.fire({
    title: titulo,
    text: mensaje,
    timer: 1000,
    icon: 'success'
  })
}
mensajeErro(titulo: string, mensaje: string){
  Swal.fire({
    title: titulo,
    text: mensaje,
    timer: 1000,
    icon: 'warning'
  })
}
}
