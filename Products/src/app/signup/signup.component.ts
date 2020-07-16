import { Component, OnInit } from '@angular/core';
import { UserModel } from "./user.model";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title: String = "Signup"
  
  constructor(private _auth: AuthService,
              private _router: Router) { }
  signupUserDetails = new UserModel(null, null);

  ngOnInit(): void {
    this._auth.logoutUser();
  }

  signupUser() {
    this._auth.signupUser(this.signupUserDetails)
    .subscribe(
      res => {
        localStorage.setItem("token", res["token"]);
        this._router.navigate(["/products"]);
      },
      err => console.log(err)
    );
  }
}
