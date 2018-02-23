import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from '@angular/http';
import { BaseService } from '../base/base.service';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs';

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

  getAuthState():any{
    return this.afAuth.authState ;
  }

  singOut():Promise<firebase.User>{
    return this.afAuth.auth.signOut().catch(this.handlePromiseError);
  }

  signIn(email: string, password: string):Promise<firebase.User> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(this.handlePromiseError);
  }

}
