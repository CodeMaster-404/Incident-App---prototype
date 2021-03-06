import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../../modules/auth/services/auth.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() profileMenu = false;
  @Output() profileMenuOutput = new EventEmitter<boolean>();
  firstName = '';
  lastName = '';
  role = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.User.subscribe(authState => {
      if (authState) {
        this.firstName = authState.firstName;
        this.lastName = authState.lastName;
        switch (authState.user_Roles.id) {
          case 0:
            this.role = 'Manager';
            break;
          case 1:
            this.role = 'User';
            break;
          case 2:
            this.role = 'Technician';
            break;
        }
      } else {
        this.firstName = '';
        this.lastName = '';
        this.role = '';
      }
    });
  }

}
