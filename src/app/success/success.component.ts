import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from '../session.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private router: Router,
              private session: SessionService) { }

  ngOnInit() {
    // if an user hasn't checked "remember me" then redirect to Login page
    const rememberMeSession = this.session.getItem('rememberMe');
    if (!rememberMeSession || rememberMeSession === 'false') {
      // client side implementation of the remember me
      this.session.setItem('isLoggedIn', 'false');
    }
  }

}
