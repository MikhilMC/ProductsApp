import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _signupUrl = "http://localhost:3000/signup";
  private _loginUrl = "http://localhost:3000/login";
  constructor(private http: HttpClient,
              private _router: Router) { }
  
  signupUser(user) {
    return this.http.post(this._signupUrl, user);
  }

  loginUser(user) {
    return this.http.post(this._loginUrl, user);
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(['/login'])
  }
}
