import { Sistema } from './../../model/sistema';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SistemaService } from '../../services/sistema/sistema.service';

@Component({
  selector: 'app-cadastro-sistema',
  templateUrl: './cadastro-sistema.component.html',
  styleUrls: ['./cadastro-sistema.component.css']
})
export class CadastroSistemaComponent implements OnInit {
  salvando: boolean = false;
  sucesso: boolean = false;
  erro: boolean = false;
  sistema: Sistema = null;


  nome = new FormControl('', [Validators.required]);
  descricao = new FormControl('', [Validators.required]);

  constructor(
    public sisService: SistemaService
  ) { }

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
    this.sistema = new Sistema(this.nome.value, this.descricao.value, null);
    this.sisService.create(this.sistema).then(() => {
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
