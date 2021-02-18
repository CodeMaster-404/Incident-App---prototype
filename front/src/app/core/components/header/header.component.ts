import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() profileMenu = false;
  @Output() profileMenuOutput = new EventEmitter<boolean>();
  firstName = '';
  lastName = '';
  role = '';

  constructor(
    private authService: AuthService
  ) { }

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

  toggleProfileMenu(): void {
    this.profileMenu = !this.profileMenu;
    this.profileMenuOutput.emit(this.profileMenu);
  }

}
