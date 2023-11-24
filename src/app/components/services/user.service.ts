import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  private identity;
  private token;
  public onSuccessLogin = new EventEmitter();
  constructor(public _http: HttpClient) {
    this.url = global.url;
  }



  public login(email: string, password: string): Observable<any> {
    return this._http.post(global.url + 'login',
     { email: email, password: password });
  }

  
}