import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HubConnectionService} from "../hub-connection-service.service";
import {Subscription} from "rxjs";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  user = localStorage.getItem("user");
  sessionKey = getSessionkey(this.activeRoute);
  private sessionSubscription: Subscription = new Subscription();
  public sessionMessages: string[] = [];
  private connection: HubConnection = new HubConnectionBuilder().withUrl('https://localhost:7174/tictactoe').configureLogging(LogLevel.Information).build();

  constructor(private activeRoute: ActivatedRoute, private router: Router, private hubConnectionService: HubConnectionService) {
  }

  ngOnInit() {
    this.sessionSubscription = this.hubConnectionService.getSessionObservable().subscribe((message) => {
      this.sessionMessages.push(message);
    });

    console.log(this.connection);
  }

  onStart() {
    this.hubConnectionService.StartGame(this.user == null ? '' : this.user, this.sessionKey);
  }
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
