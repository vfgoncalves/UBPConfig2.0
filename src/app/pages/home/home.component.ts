import { Observable } from 'rxjs';
import { Sistema } from './../../model/sistema';
import { Component, OnInit } from '@angular/core';
import { SistemaService } from '../../services/sistema/sistema.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sistemas: Observable<Sistema[]>;
  constructor(
    public sisService: SistemaService
  ) { }

  ngOnInit() {
    //busca todos os sistemas que o usuário possui
    this.sistemas = this.sisService.getAll().valueChanges()
  }
}
