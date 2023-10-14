import {Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserConnection} from "./SharedClasses/UserConnection";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  @Input() isSignedIn: boolean = false;
  @Input() username: string = "";
  @Input() sessionKey: string = "";

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isSignedIn = CheckSignedIn(this.activatedRoute);
  }

  InitGame(Credentials: UserConnection) {
    this.username = Credentials.user;
    this.sessionKey = Credentials.session;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['sessionKey'].currentValue);
    this.isSignedIn = CheckSignedIn(this.activatedRoute);
  }
}

function CheckSignedIn(activatedRoute: ActivatedRoute) {
  const user = localStorage.getItem('user');
  const paramSessionKey = localStorage.getItem('sessionKey');
  const localSessionKey = activatedRoute.snapshot.paramMap.get('sessionKey');
  if (user != null && (paramSessionKey != null || localSessionKey != null)) {
    return true;
  } else {
    return false;
  }
}


