import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Sistema } from './../../model/sistema';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import * as firebase from 'firebase/app';

@Injectable()
export class SistemaService extends BaseService {
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

  create(sis: Sistema): Promise<void> {
    let id = this.createPushId();
    sis.id = id;
    return this.db.object(`/sistema/${this.uuid}/${id}`)            
      .set(sis)
      .catch(this.handlePromiseError);
  }

  createPushId():string{
    return this.db.createPushId()
  }  

  getAll():AngularFireList<Sistema>{
    return this.db.list(`/sistema/${this.uuid}`)
  }
}
