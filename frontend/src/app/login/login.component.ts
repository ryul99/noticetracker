import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: string;
  password: string;
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  signIn() {
    this.userService.signIn(this.id, this.password).then(success => {
      if (success) {
        console.log('${this.id} ${this.password} sign in!\n');
        this.router.navigate(['/newsfeed']);
      } else {
        return;
      }
    });
  }

  signUp() {
    this.userService.signUp(this.id, this.password).then(success => {
      if (success) {
        console.log('sign up!\n');
        this.router.navigate(['/submit_time_table']);
      } else {
        return;
      }
    });
  }

  signOut() {
    this.userService.signOut().then(success => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        return;
      }
    });
  }
}
