import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header-profile-menu',
  templateUrl: './header-profile-menu.component.html',
  styleUrls: ['./header-profile-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderProfileMenuComponent implements OnInit {

  @Output() menuClick = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  menuClicked(): void {
    this.menuClick.emit(false);
  }

  logout(): void {
    this.menuClick.emit(false);
    this.authService.logout();
  }

}
