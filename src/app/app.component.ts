import {Component, OnInit, SimpleChanges, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private route: Router) {
  }

  ngOnInit() {
    let isSignedIn = CheckSignedIn(this.activatedRoute);
    if (isSignedIn) {
      const paramSessionKey = localStorage.getItem('sessionKey');
      const localSessionKey = this.activatedRoute.snapshot.paramMap.get('sessionKey');
      const sessionkey: string = localSessionKey != null ? localSessionKey : paramSessionKey != null ? paramSessionKey : '';
      this.route.navigate([`/game/${sessionkey}`]);
    } else {
      this.route.navigate([`/sign-in`]);
    }
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


