import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: string = '';
  password: string = '';
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.authorized().then(success => {
      if (success) {
        this.router.navigate(['/newsfeed']);
      }
    });
  }

  signIn() {
    if (!this.id || !this.password) {
      alert('Please enter both ID and password.');
      return;
    }
    this.userService.signIn(this.id, this.password).then(success => {
      if (success) {
        this.router.navigate(['/newsfeed']);
      } else {
        alert('Wrong ID or password.');
        return;
      }
    });
  }

  signUp() {
    if (!this.id || !this.password) {
      alert('Please enter both ID and password.');
      return;
    }
    this.userService.signUp(this.id, this.password).then(success => {
      if (success) {
        this.router.navigate(['/submit_time_table']);
      } else {
        alert('Sign up failed.');
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
