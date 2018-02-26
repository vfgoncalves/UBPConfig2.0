import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSistemaComponent } from './cadastro-sistema.component';

describe('CadastroSistemaComponent', () => {
  let component: CadastroSistemaComponent;
  let fixture: ComponentFixture<CadastroSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
