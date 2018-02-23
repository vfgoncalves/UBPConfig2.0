import { MatDialog } from '@angular/material';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  logando:boolean = false;
  errologin:boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required]);
  authState: any = null; 

  constructor(
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
      this.authState = this.authService.getAuthState();
      if (this.authState !== null){
        this.authState.subscribe( (user) => {
          if (user) {
            this.router.navigateByUrl("/home")
          }
        })
      }
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Este campo é obrigatório' :
        this.email.hasError('email') ? 'O e-mail informado não é valido' :
            '';
  }
  
  getPasswordErrorMessage() {
    return this.senha.hasError('required') ? 'Este campo é obrigatório' :
            '';
  }

  onSubmit():void{
    this.logando = true;
    this.authService.signIn(this.email.value,this.senha.value)
    .then((user: firebase.User) => {
      //usuário autenticado
      this.router.navigateByUrl("/home")
      this.logando = false;
      this.errologin = false;
    })
    .catch((error: any) => {
      //erro na autenticação
      this.logando = false;  
      this.errologin = true;    
    })
  }
}
