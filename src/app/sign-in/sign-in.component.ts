import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {UserConnection} from "../SharedClasses/UserConnection";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private router: Router) {
  }

  onHost(user: string) {
    let sessionKey = Math.floor(Math.random() * 1000000).toString();
    localStorage.setItem("sessionKey", `${sessionKey}`);
    localStorage.setItem("user", `${user}`);
    this.router.navigate([`game/${sessionKey}`]);
  }

  onJoin(sessionKey: string, user: string) {
    localStorage.setItem("sessionKey", `${sessionKey}`);
    this.router.navigate([`game/${sessionKey}`]);
  }
}
