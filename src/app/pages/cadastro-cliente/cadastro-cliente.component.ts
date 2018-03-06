import { Sistema } from './../../model/sistema';
import { Observable } from 'rxjs';
import { SistemaService } from './../../services/sistema/sistema.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  salvando: boolean = false;
  sucesso: boolean = false;
  erro: boolean = false;
  cliente: Cliente = null;
  sistemasSelect: Observable<Sistema[]>;

  //FORMS CONTROLS
  nome = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  sistemas = new FormControl('', [Validators.required]);
  constructor(
    public cliService: ClienteService,
    public sisService: SistemaService
  ) {
    this.sistemasSelect = this.sisService.getAll().valueChanges();
   }

  ngOnInit() {
  }

  getFormControlClass(isValid: boolean, isPristine: boolean): {} {
    return {
      'form-control': true,
      'is-invalid': !isValid && !isPristine,
      'is-valid': isValid && !isPristine
    };
  }

  getFormControlSelectClass(isValid: boolean, isPristine: boolean): {} {
    return {
      'custom-select': true,
      'is-invalid': !isValid && !isPristine,
      'is-valid': isValid && !isPristine
    };
  }

  onSubmit() {
    this.salvando = true;
    this.sucesso = false;
    this.erro = false;
    this.cliente = new Cliente(null, this.nome.value, this.email.value, this.sistemas.value);
    this.cliService.create(this.cliente).then(() => {
      this.salvando = false;
      this.sucesso = true;
      this.erro = false;
    })
      .catch(() => {
        this.salvando = false;
        this.sucesso = false;
        this.erro = true;
      })
  }

}
