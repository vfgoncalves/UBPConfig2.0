import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  pwdPattern = "^(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z])(?=.*[A-Z]).{8,}$";
  email = new FormControl('', [Validators.required, Validators.email]);
  nome = new FormControl('', [Validators.required]);
  senha = new FormControl('', [Validators.required, Validators.pattern(this.pwdPattern)]);

  constructor() { }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Este campo é obrigatório' :
        this.email.hasError('email') ? 'O e-mail informado não é valido' :
            '';
  }
  
  getPasswordErrorMessage() {
    return this.senha.hasError('required') ? 'Este campo é obrigatório' :
           this.senha.hasError('pattern') ? 'Senha inválida, a mesma deve possui no mínimo 1 letra maiúscula, 1 letra minúscula, 1 número e 8 caracteres' :
            '';
  }

}
