import { Sistema } from './../../model/sistema';
import { Empresa } from './../../model/empresa';
import { Observable } from 'rxjs';
import { EmpresaService } from './../../services/empresa/empresa.service';
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
  emps: Observable<Empresa[]>;
  sistema: Sistema = null;


  nome = new FormControl('', [Validators.required]);
  descricao = new FormControl('', [Validators.required]);
  empresa = new FormControl('', [Validators.required]);

  constructor(
    public sisService: SistemaService,
    public empService: EmpresaService
  ) { }

  ngOnInit() {
    this.emps = this.empService.getAll().valueChanges();
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
    this.sistema = new Sistema(this.nome.value, this.descricao.value, this.empresa.value, null);
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
