import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSignOut():void{
    this.authService.singOut()
    .then((user: firebase.User) => {
      this.router.navigateByUrl("");
    })
    .catch((error :any) => {
      console.log("erro : " + error);
    });
  }

}
