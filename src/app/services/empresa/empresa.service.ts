import { AngularFireDatabase } from 'angularfire2/database';
import { Empresa } from './../../model/empresa';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable()
export class EmpresaService extends BaseService  {

  constructor(
    public db: AngularFireDatabase,
  ) { 
    super();
  }

  create(emp: Empresa): Promise<void> {
    let id = this.createPushId();
    return this.db.object(`/empresa/${id}`)            
      .set(emp)
      .catch(this.handlePromiseError);
  }

  createPushId():string{
    return this.db.createPushId()
  }  
}
