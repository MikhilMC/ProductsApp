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
    // this._auth.logoutUser();
    localStorage.removeItem('token');
  }

  signupUser() {
    this._auth.signupUser(this.signupUserDetails)
    .subscribe(
      res => {
        if (res['msg'] !== undefined) {
          alert(res['msg']);
          this._router.navigateByUrl("/dummy", {skipLocationChange: true})
          .then(()=>{
            this._router.navigate(['/signup']);
          })
        } else {
          console.log(res);
          localStorage.setItem('token', res['token']);
          this._router.navigate(["/products"])
        }
      },
      err => console.log(err)
    );
  }
}
