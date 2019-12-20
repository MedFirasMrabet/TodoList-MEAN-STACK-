import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient, private authService: AuthService, private cookieService: CookieService) {

  }

  addTodo(todo) {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToen()
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.http.post(environment.url + '/api/todos/add', todo, httpOptions);
  }

  getTodos() {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToen()
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(environment.url + '/api/todos/', httpOptions);
  }

  deleteTodo(id) {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToen()
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(environment.url + '/api/todos/delete/' + id, httpOptions);
  }
  uncheckTodo(id) {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToen()
    });
    const httpOptions = {
      headers: headers_object
    };
    console.log(id);

    return this.http.get(environment.url + '/api/todos/uncheck/' + id, httpOptions);
  }
  checkTodo(id) {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToen()
    });
    const httpOptions = {
      headers: headers_object
    };
    console.log(id);
    return this.http.get(environment.url + '/api/todos/check/' + id, httpOptions);
  }


}
