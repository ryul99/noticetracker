import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: string;
  password: string;  

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.userService.signIn(this.id, this.password);
    console.log("sign in!\n");
  }

  signUp() {
    this.userService.signUp(this.id, this.password);
    console.log("sign up!\n");
  }
}
