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

  public register(name:string, email:string, password:string, telefono:string, id_front:File, id_back:File, licencia:File, profile_pic:File, card:string, cvv:string, fecha_vencimiento):Observable<any>{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('telefono', telefono);
    formData.append('id_front', id_front);
    formData.append('id_back', id_back);
    formData.append('licencia', licencia);
    formData.append('profile_pic', profile_pic);
    formData.append('card', card);
    formData.append('cvv', cvv);
    formData.append('fecha_vencimiento', fecha_vencimiento);

    return this._http.post(global.url + 'createUser', formData);
  }

  
}