import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioL: FormGroup;
  datosCorrectos: boolean= true;
  textoError: string= '';

  constructor(private creadorForm: FormBuilder, public auth: AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit(){
    this.formularioL= this.creadorForm.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }
  ingresar(){
    if(this.formularioL.valid){
      this.datosCorrectos= true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioL.value.email, this.formularioL.value.password)
      .then((usuario)=>{
        console.log(usuario)
        this.spinner.hide();
    }).catch((error)=>{
      this.datosCorrectos= false;
      this.textoError= error.message;
      this.spinner.hide();
    })
  }else{
    this.datosCorrectos= false;
    this.textoError= 'Reviza los datos!!!';
  }
}
}
