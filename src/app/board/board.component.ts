import {Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() connection: any;
  constructor(private activatedRoute: ActivatedRoute) {
    console.log(this.connection);
  }

  ShowSessionKey () {
    alert(localStorage.getItem("sessionKey"));
  }
}
