import { User } from './../../../interfaces/User.Model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../../shared/repository.service';
import { ErrorHandlerService } from '../../../shared/error-handler.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public user: User;
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  ngOnInit() {
    this.getUser();
  }
  private getUser = () =>{
    let id: number = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/users/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.user = res as User;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }
}
