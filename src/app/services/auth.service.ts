import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user;
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    if (this.isLoggedIn()) {
      this.user = this.getUser();
    }
  }

  login(user) {
    return this.http.post(environment.url + '/api/users/login', user);
  }


  register(user) {
    return this.http.post(environment.url + '/api/users/', user);
  }

  setToken(token) {
    this.cookieService.set('token', token, 0);
    this.user = this.getUser();
  }
  getToen() {
    return this.cookieService.get('token');
  }
  isLoggedIn() {
    return this.cookieService.check('token');
  }
  validToken() {
    if (this.cookieService.get('token')) {
      return true;
    }
    this.user = {};
    return false;
  }
  getUser() {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.cookieService.get('token'));
  }


  logout() {
    this.cookieService.deleteAll();
    this.cookieService.delete('token');
    this.user = null;
    this.router.navigateByUrl('/home');
    window.location.reload(true);
  }
}
