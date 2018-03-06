import { UserService } from './../../services/user/user.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from '../../model/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  logando: boolean = false;
  errologin: boolean = false;
  error: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required]);
  authState: any = null;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.logando = true;
    this.errologin = false;
    
    this.authService.signIn(this.email.value, this.senha.value)
      .then((user: firebase.User) => {
        //usuário autenticado
        this.router.navigateByUrl("/home")
        this.logando = false;
        this.errologin = false;
      })
      .catch((error: any) => {
        //erro na autenticação
        this.error = error;
        this.logando = false;
        this.errologin = true;
      })
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Este campo é obrigatório' :
      this.email.hasError('email') ? 'O e-mail informado não é valido' :
        '';
  }

  getFormControlClass(isValid: boolean, isPristine: boolean): {} {
    return {
      'form-control': true,
      'is-invalid': !isValid && !isPristine,
      'is-valid': isValid && !isPristine
    };
  }

  loginUser() {
    this.authService.loginWithGoogle().then(data => {
      let user: User = new User(data["user"]["displayName"], data["user"]["email"], data["user"]["email"],data["user"]["photoURL"]);      
      this.userService.create(user, data["user"]["G"]).then(r => {        
        this.router.navigateByUrl("/home")
      })
    })
  }
}
