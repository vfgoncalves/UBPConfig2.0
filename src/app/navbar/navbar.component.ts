import { UserService } from './../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from '../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User = null;
  nome: string = "";
  constructor(
    public authServ: AuthService,
    public userServ: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.userServ.getCurrentUser()
    .valueChanges()
    .subscribe((user: User)=>{
      this.user = user;
      if (user !== null){
        this.nome = user.name;
      }      
    })
    
  }

  onSignOut(): void {
    this.authServ.singOut()
      .then((user: firebase.User) => {
        this.router.navigateByUrl("");
      })
      .catch((error: any) => {
        console.log("erro : " + error);
      });
  }

}
