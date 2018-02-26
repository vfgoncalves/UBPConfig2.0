import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../model/user';
import { UserService } from './../../services/user/user.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  salvando: boolean = false;
  errorcadastro: boolean = false;
  error: any;
  form: FormGroup;
  pwdPattern = "^(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z])(?=.*[A-Z]).{8,}$";
  usePattern = "^[-\w\.\$@\*\!]{8,30}$";


  email = new FormControl('', [Validators.required, Validators.email]);
  nome = new FormControl('', [Validators.required]);
  usuario = new FormControl('', [Validators.required]);
  senha = new FormControl('', [Validators.required, Validators.pattern(this.pwdPattern)]);

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public router: Router
  ) { }

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

  getUsernameErrorMessage() {
    return this.usuario.hasError('required') ? 'Este campo é obrigatório' :
      '';
  }

  getFormControlClass(isValid: boolean, isPristine: boolean): {} {
    return {
      'form-control': true,
      'is-invalid': !isValid && !isPristine,
      'is-valid': isValid && !isPristine
    };
  }

  onSubmit(): void {
    this.salvando = true;
    this.errorcadastro = false;

    this.authService.createAuthUser({ email: this.email.value, password: this.senha.value })
      .then((authUser: firebase.User) => {
        let uuid: string = authUser.uid;
        let user: User = new User(this.nome.value, this.usuario.value, this.email.value);

        //Grava dados do usuário no banco
        this.userService.create(user, uuid)
          .then(() => {
            //Usuário criado com sucesso
            this.salvando = true;
            this.router.navigateByUrl("/home")
          })
          .catch((error: any) => {
            this.salvando = false;
            this.errorcadastro = true;
            this.error = error
          })

      })
      .catch((error: any) => {
        this.salvando = false;
        this.errorcadastro = true;
        this.error = error
      })
  }

  openDialog(msgm: string): void {
    // let dialogRef = this.dialog.open(DialogComponent, {
    //   data: msgm
    // });
  }

}
