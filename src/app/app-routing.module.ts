import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardComponent} from "./board/board.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {GameComponent} from "./game/game.component";

const routes: Routes = [
  {
    path: 'sign-in', component: SignInComponent
  }, {
    path: 'game', component: GameComponent
  }, {
    path: 'game/:sessionKey', component: GameComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
