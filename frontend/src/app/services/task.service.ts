import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL_API =  'http://localhost:4000';
  constructor(public http: HttpClient) { }

  getUsers(){
    let petition  = this.http.get<any>(this.URL_API + '/users')
    return petition;
  }
}
