import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HubConnectionService} from "../hub-connection-service.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private router: Router, private connectionService: HubConnectionService) {
  }

  onHost(user: string) {
    let sessionKey = Math.floor(Math.random() * 1000000).toString();
    localStorage.setItem("sessionKey", `${sessionKey}`);
    localStorage.setItem("user", `${user}`);
    this.connectionService.joinAndStartSession(user, sessionKey);
    this.router.navigate([`game/${sessionKey}`]);
  }

  onJoin(sessionKey: string, user: string) {
    localStorage.setItem("sessionKey", `${sessionKey}`);
    this.router.navigate([`game/${sessionKey}`]);
    this.connectionService.joinAndStartSession(user, sessionKey);
  }
}
