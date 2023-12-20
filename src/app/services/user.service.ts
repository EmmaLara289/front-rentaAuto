import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { param } from 'jquery';

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

  public register(name:string, email:string, password:string, telefono:string, id_front:File, id_back:File, licencia_front:File, licencia_back:File, profile_pic:File, card:string, cvv:string, fecha_vencimiento):Observable<any>{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('telefono', telefono);
    formData.append('id_front', id_front);
    formData.append('id_back', id_back);
    formData.append('licencia_front', licencia_front);
    formData.append('licencia_back', licencia_back);
    formData.append('profile_pic', profile_pic);
    formData.append('card', card);
    formData.append('cvv', cvv);
    formData.append('fecha_vencimiento', fecha_vencimiento);

    return this._http.post(global.url + 'createUser', formData);
  }

  public getCat():Observable<any>{
    return this._http.get(global.url + 'getVehicleData');
  }

  public getProcess(id_user: number):Observable<any>{
    let params = new HttpParams();
    params = params.set('id_user', id_user);
    return this._http.get(global.url + 'getProcess', {params: params});
  }

  public getDays(fecha_inicio: any, fecha_final: any):Observable<any>{
    let params = new HttpParams();
    params = params.set('fecha_inicio', fecha_inicio);
    params = params.set('fecha_final', fecha_final);
    return this._http.get(global.url + 'calcularDias', { params:params });
  }

  public getPasswordRecovery(email:string):Observable<any>{
    let params = new HttpParams();
    params = params.set('email', email);
    return this._http.get(global.url + 'recoveryUser', { params:params });
  }

  public checkReserved(id_user: number):Observable<any>{
    let params = new HttpParams();
    params = params.set('id_user', id_user);
    return this._http.get(global.url + "checkerRent", { params:params });
  }

  public calcularRenta(dias: number,id_vehicles: number):Observable<any>{
    let params = new HttpParams();
    params = params.set('dias', dias);
    params = params.set('id_vehicles', id_vehicles);
    return this._http.get(global.url + "calcularRenta", { params: params});
  }

  public getPasajeros(modelo:string):Observable<any>{
    let params = new HttpParams();
    params = params.set('modelo', modelo);
    
    return this._http.get(global.url + 'getFiltersPasajeros', { params: params});
  }

  public getColores(modelo:string):Observable<any>{
    let params = new HttpParams();
    params = params.set('modelo', modelo);

    return this._http.get(global.url + 'getFiltersColors',  { params: params});
  }

  public getModels():Observable<any>{
    return this._http.get(global.url + 'getFiltersModelos');
  }

  public getVehicleData(modelo: string, color: string, pasajeros: string, text: string):Observable<any>{
    let params = new HttpParams();

    if(modelo !== undefined){
      params = params.set('modelo', modelo);
    }

    if(color !== undefined){
      params = params.set('color', color);
    }

    if(pasajeros !== undefined){
      params = params.set('pasajeros', pasajeros);
    }

    if(text !== undefined){
      params = params.set('text', text);
    }

    return this._http.get(global.url + 'getVehicleData',  { params: params});
  }

  public calcularApartado(dias: number,id_vehicles: number):Observable<any>{
    let params = new HttpParams();
    params = params.set('dias', dias);
    params = params.set('id_vehicles', id_vehicles);
    return this._http.get(global.url + "calcularApartado", { params: params});
  }

  public rentVehicle(id_user: number, id_vehicles: number, fecha_inicio: any, fecha_final: any, dias:number):Observable<any>{
    return this._http.post(global.url + "rentVehicle", 
    {id_user:id_user, id_vehicles:id_vehicles, fecha_inicio:fecha_inicio, fecha_final:fecha_final, dias:dias});
  }

  public reservateVehicle(id_user: number, id_vehicles: number, fecha_inicio: any, fecha_final: any, dias:number):Observable<any>{
    return this._http.post(global.url + "reservateVehicle", 
    {id_user:id_user, id_vehicles:id_vehicles, fecha_inicio:fecha_inicio, fecha_final:fecha_final, dias:dias});
  }

  public cancelReservacion(id_procesos_vehicles: number):Observable<any>{
    return this._http.post(global.url + "cancelReservacion",
    {id_procesos_vehicles:id_procesos_vehicles});
  }

  public RegresarReservacion(id_procesos_vehicles: number):Observable<any>{
    return this._http.post(global.url + "regresarReservacion",
    {id_procesos_vehicles:id_procesos_vehicles});
  }

  public getUserData(id_user:number):Observable<any>{
    let params = new HttpParams();
    params = params.set('id_user', id_user);
    return this._http.get(global.url + "getUserData", { params: params});
  }
  
  

}