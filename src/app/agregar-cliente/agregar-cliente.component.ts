import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MensajesService } from '../servicios/mensajes.service';




@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  urlImagen: '';
  editable: boolean = false;
  id: string;


  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private mensaje: MensajesService) { }

  ngOnInit() {
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      curp: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [],
      url: ['']
    })

    this.id = this.activeRoute.snapshot.params.clienteID;
    if (this.id != undefined) {
      this.editable = true;
      this.db.doc<any>('clientes' + '/' + this.id).valueChanges().subscribe((cliente) => {

        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          curp: cliente.curp,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0, 10),
          telefono: cliente.telefono,
          url: ''
        })
        this.urlImagen = cliente.urlImagen;
      });
    }


  }
  agregar() {
    this.formularioCliente.value.url = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    console.log(this.formularioCliente.value)
    this.db.collection('clientes').add(this.formularioCliente.value).then((termino) => {
      this.mensaje.mensajeExito('Registro exitoso', 'Se agrego correctamente el usuario!');
  })
}

  editar() {
    this.formularioCliente.value.url = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    this.db.doc('clientes/' + this.id).update(this.formularioCliente.value).then((resul)=>{
      console.log('Actualizado');
    });
  }


  subirImagen(evento) {
     if (evento.target.files.length > 0) {
      let nombre = new Date().getTime().toString();
      let archivo = evento.target.files[0]
      console.log(evento)
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))
      let ruta = 'clientes/' + nombre + extension;
      const referencia = this.storage.ref(ruta);
      const subida = referencia.put(archivo);
      subida.then((objeto) => {

        referencia.getDownloadURL().subscribe((direccion) => {
          this.urlImagen = direccion;
        })

      })
      subida.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt(porcentaje.toString());
        console.log(porcentaje);

      })
    }
  }
}
