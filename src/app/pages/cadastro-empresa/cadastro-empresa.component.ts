import { EmpresaService } from './../../services/empresa/empresa.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../model/empresa';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {
  salvando: boolean = false;
  sucesso:boolean = false;
  erro: boolean = false;

  emp: Empresa = null;
  sigla = new FormControl('', [Validators.required]);
  nome = new FormControl('', [Validators.required]);
  descricao = new FormControl('', [Validators.required]);

  constructor(
    public empService: EmpresaService
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

  onSubmit(){
    this.salvando = true;
    this.emp = new Empresa(this.sigla.value, this.nome.value, this.descricao.value);
    this.empService.create(this.emp).then(() =>{
      this.salvando = false;
      this.sucesso = true;      
      this.erro = false;
    }).catch(()=>{
      this.erro = true;
      this.sucesso = true;
    })
  }

}
