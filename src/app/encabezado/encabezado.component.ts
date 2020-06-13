import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  usuario: User;
  cargando: boolean= true;
  isCollapsed= true;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit() {
    this.auth.user.subscribe((usuario)=>{
      setTimeout(()=>{
        this.cargando= false;
        this.usuario= usuario;
      }, 1000);
    })
  }

  logout(){
    this.auth.signOut();
  }
}
