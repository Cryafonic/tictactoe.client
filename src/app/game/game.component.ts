import {Component, Input} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {ActivatedRoute, Router} from "@angular/router";
import {UserConnection} from "../SharedClasses/UserConnection";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  user = localStorage.getItem("user");
  sessionKey = getSessionkey(this.activeRoute);
  connection = new HubConnectionBuilder().withUrl('https://localhost:7174').configureLogging(LogLevel.Information).build();

  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    console.log(this.connection);
  }

  ngOnInit() {
    joinAndStartSession(this.user != null ? this.user : "", this.sessionKey, this.router, this.connection);
  }

  onStart() {
    startGame(this.user != null ? this.user : "", this.sessionKey, this.connection);
  }
}

async function startGame(user: string, sessionKey: string, connection: HubConnection) {

  const userConnection = new UserConnection();
  userConnection.user = user;
  userConnection.session = sessionKey;
  await connection.invoke("StartGame", userConnection);
}

async function joinAndStartSession(user: string, sessionKey: string, router: Router, connection: HubConnection) {
  connection.on("session", (serverMessage) => {
    const sessionMessagesDiv = document.querySelector('#SessionMessages');
    if (sessionMessagesDiv != null) {
      sessionMessagesDiv.innerHTML += `<br><p>${serverMessage}</p>`;
    }
  });

  connection.on("boardRoute", (canRoute) => {
    if (canRoute) {
      router.navigate(['board']);
    }
  });

  await connection.start();
  const userConnection = new UserConnection();
  userConnection.user = user;
  userConnection.session = sessionKey;
  await connection.invoke("JoinSession", userConnection);
}

function getSessionkey(activatedRoute: ActivatedRoute) {
  const paramSessionKey = activatedRoute.snapshot.paramMap.get('sessionKey');
  const localStorageSessionKey = localStorage.getItem("sessionKey");

  if (paramSessionKey != null) {
    return paramSessionKey;
  } else if (localStorageSessionKey != null) {
    return localStorageSessionKey;
  } else {
    return "";
  }
}
