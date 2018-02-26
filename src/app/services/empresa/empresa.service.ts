import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Empresa } from './../../model/empresa';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import * as firebase from 'firebase/app';

@Injectable()
export class EmpresaService extends BaseService  {  
  uuid: string; 

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) { 
    super();
    this.listenAuthState();
  }

  private listenAuthState(): void {
    this.afAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          this.uuid = authUser.uid;   
        }
      });
  }

  create(emp: Empresa): Promise<void> {
    let id = this.createPushId();
    emp.id = id;
    return this.db.object(`/empresa/${this.uuid}/${id}`)            
      .set(emp)
      .catch(this.handlePromiseError);
  }

  createPushId():string{
    return this.db.createPushId()
  }
  
  getAll():AngularFireList<Empresa>{
    return this.db.list(`/empresa/${this.uuid}`)
  }
}
