import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  profileMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleProfileMenu(bool: boolean): void {
    this.profileMenu = bool;
  }

  menuClicked(): void {
    this.profileMenu = false;
  }
}
