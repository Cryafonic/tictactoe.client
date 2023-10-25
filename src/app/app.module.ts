import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {FormsModule} from "@angular/forms";
import {SignInComponent} from './sign-in/sign-in.component';
import {GameComponent} from './game/game.component';
import {HubConnectionService} from "./hub-connection-service.service";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SignInComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HubConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
