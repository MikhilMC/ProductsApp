import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _auth: AuthService) { }
  title:String = "Product Management";
  ngOnInit(): void {
  }

  hasAuth() {
    return this._auth.isLoggedIn();
  }

  logoutUser() {
    this._auth.logoutUser();
  }

}
