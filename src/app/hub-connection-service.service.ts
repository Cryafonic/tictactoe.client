import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {Router} from "@angular/router";
import {UserConnection} from "./SharedClasses/UserConnection";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HubConnectionService {
  private connection: HubConnection = new HubConnectionBuilder().withUrl('https://localhost:7174/tictactoe').configureLogging(LogLevel.Information).build();
  private sessionSubject = new BehaviorSubject<string>('');

  constructor() {
    this.connection.on("session", (serverMessage) => {
      this.sessionSubject.next(serverMessage);
    });
  }

  getConnectionID() {
    return this.connection.connectionId;
  }

  joinAndStartSession(user: string, sessionKey: string) {
    joinAndStartSession(user, sessionKey, this.connection);
  }

  StartGame(user: string, sessionKey: string) {
    startGame(user, sessionKey, this.connection)
  }

  getSessionObservable() {
    return this.sessionSubject.asObservable();
  }
}

async function startGame(user: string, sessionKey: string, connection: HubConnection) {
  const userConnection = new UserConnection();
  userConnection.user = user;
  userConnection.session = sessionKey;
  await connection.invoke("StartGame", userConnection);
}

async function joinAndStartSession(user: string, sessionKey: string, connection: HubConnection) {
  await connection.start();
  const userConnection = new UserConnection();
  userConnection.user = user;
  userConnection.session = sessionKey;
  await connection.invoke("JoinSession", userConnection);
}
