import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { UploadTask } from '@firebase/storage-types';
import { BaseService } from '../base/base.service';
import { Versao } from '../../model/versao';

@Injectable()
export class VersaoService  extends BaseService {
  uuid: string;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public firebaseApp: FirebaseApp    
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

  create(ver: Versao, idSis: string): Promise<void> {
    let id = this.createPushId();
    ver.id = id;
    return this.db.object(`/versao/${this.uuid}/${idSis}/${id}`)
      .set(ver)
      .catch(this.handlePromiseError);
  }

  createPushId(): string {
    return this.db.createPushId()
  }

  getAll(idSis: string): AngularFireList<Versao> {
    return this.db.list(`/versao/${this.uuid}/${idSis}`)
  }

  uploadExec(executavel, idversao: string): UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/executavel/${this.uuid}/${idversao}/${executavel.name}`)
      .put(executavel);
  }

  getExecutaveis(idversao: string): Observable<any> {   
    return this.db.list(`/executavel/${this.uuid}/${idversao}/`).valueChanges()
  }

  uploadScript(script, idversao: string): UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/script/${this.uuid}/${idversao}/${script.name}`)
      .put(script);
  }

  uploadDocumento(documento, idversao: string): UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/documento/${this.uuid}/${idversao}/${documento.name}`)
      .put(documento);
  }
}
