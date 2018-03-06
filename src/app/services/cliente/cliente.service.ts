import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import * as firebase from 'firebase/app';
import { Cliente } from '../../model/cliente';

@Injectable()
export class ClienteService extends BaseService {
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

  create(cli: Cliente): Promise<void> {
    let id = this.createPushId();
    cli.id = id;
    return this.db.object(`/clientes/${this.uuid}/${id}`)            
      .set(cli)
      .catch(this.handlePromiseError);
  }
  getAll():AngularFireList<Cliente>{
    return this.db.list(`/clientes/${this.uuid}`)
  }

  createPushId():string{
    return this.db.createPushId()
  } 

}
