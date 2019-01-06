import { Injectable } from '@angular/core';
import {LoginRequest} from './models/login-request';
import {HttpClient} from '@angular/common/http';

const endpointUrl = 'https://stage.justmanage.com/API/v1/account';
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private httpClient: HttpClient) { }

  login(data: LoginRequest): Promise<boolean> {
    return this.httpClient.post(endpointUrl + '/login',
      data)
      .toPromise()
      .then(response => {
        console.log(response);
        return true;
      });
  }
}
