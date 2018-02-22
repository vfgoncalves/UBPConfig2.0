import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required]);

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
            '';
  }

}
