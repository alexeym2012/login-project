import {Injectable} from '@angular/core';
import {LoginRequest} from './models/login-request';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ELoginResponse} from './models/login-response';
import {SessionService} from './session.service';

const endpointUrl = 'https://stage.justmanage.com/API/v1/account';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private badLoginState: BadLoginState;

  constructor(private httpClient: HttpClient,
              private session: SessionService) {

    const loginStateJson = this.session.getItem('badLoginState') || '';
    this.badLoginState = loginStateJson ? JSON.parse(loginStateJson) : {};

  }

  login(data: LoginRequest): Promise<ELoginResponse> {
    if (this.badLoginState[data.username] > 2) {
      return Promise.resolve(ELoginResponse.UserBlocked);
    } else {
      return this.httpClient.post(endpointUrl + '/login',
        data)
        .toPromise()
        .then(response => {

          console.log(response);
          this.session.setItem('isLoggedIn', 'true');
          this.session.setItem('rememberMe', data.rememberMe.toString());
          return ELoginResponse.OK;
        })
        .catch((error: HttpErrorResponse)  => {
          if (error.status === 403) {

            this.updateBadLoginCounter(data.username);

            return ELoginResponse.BadCredentials;
          } else {
            return ELoginResponse.Error;
          }
        });
    }

  }


  private updateBadLoginCounter(username: string) {
    this.badLoginState[username] += 1;
    this.session.setItem('badLoginState', JSON.stringify(this.badLoginState));
  }
}

class BadLoginState {
  [username: string]: number;
}
