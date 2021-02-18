import { User } from './../../../../interfaces/User.Model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @Input() public user: User;
  @Output() selectEmitt = new EventEmitter();
  constructor(private location: Location,) { }
  ngOnInit() {
  }

  public onCancel = () => {
    this.location.back();
  }

}
