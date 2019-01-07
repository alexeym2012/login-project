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
    const isLoggedInSession = this.session.getItem('isLoggedIn');
    if (!isLoggedInSession || isLoggedInSession === 'false') {
      this.router.navigateByUrl('login');
    }
  }

}
