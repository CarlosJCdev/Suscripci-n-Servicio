import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[]= new Array<any>();

  constructor( private db: AngularFirestore) { }

  ngOnInit() {
    /* DE esta forma, nos devuelve firestone, solo los datos que creamos, mas no el id, entre otros datos, por lo
    que debemos de manejarlo de otra manera en la que nos traigmos todos los datos y algunos otros como el id*/
    /* this.db.collection('clientes').valueChanges().subscribe((resultado)=>{
      this.clientes= resultado;
    }); */

    this.clientes.length= 0;
    this.db.collection('clientes').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        /* Creo un nuevo cliente al cual le asgino toda la info que trae item*/
        let cliente= item.data();
        /* El id es necesario para la busqueda por ejemplo de un cliente*/
        cliente.id= item.id;
        /* La ref, nos ayudara para  crear, borrar o editar un cliente*/
        cliente.ref= item.ref;
        /* Agregamos el cliente creado al array de clientes*/
        this.clientes.push(cliente)
      })
    })
  }

}
