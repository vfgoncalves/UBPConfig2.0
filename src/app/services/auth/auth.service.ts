import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from '@angular/http';
import { BaseService } from '../base/base.service';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService extends BaseService {

  constructor(
    public afAuth: AngularFireAuth,
    public http: Http
  ) {
    super();
  }

  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

}
