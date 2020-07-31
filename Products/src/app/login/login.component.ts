import { Component, OnInit } from '@angular/core';
import { UserModel } from "../signup/user.model";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: String = "Login"

  constructor(private _auth: AuthService, 
              private _router: Router) { }
  loginUserDetails = new UserModel(null, null);
  ngOnInit(): void {
    // this._auth.logoutUser();
    localStorage.removeItem('token');
  }

  loginUser() {
    this._auth.loginUser(this.loginUserDetails)
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
