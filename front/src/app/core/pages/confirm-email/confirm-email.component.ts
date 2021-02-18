import { ConfirmEmailRequest } from './../../models/requests.model';
import { ConfirmEmailService } from './../../services/confirm-email.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  private userId = '';
  private code = '';

  constructor(
    private route: ActivatedRoute,
    private confirmEmailService: ConfirmEmailService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams.id || null;
    this.code = this.route.snapshot.queryParams.code || null;

    console.log('User id: ' + this.userId + ' Code: ' + this.code);

    this.confirmEmailService.confirm({ id: this.userId, code: this.code })
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      });

  }

}
