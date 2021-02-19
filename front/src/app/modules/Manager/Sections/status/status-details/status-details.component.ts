import { Status } from './../../../interfaces/Status.Model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../../shared/repository.service';
import { ErrorHandlerService } from '../../../shared/error-handler.service';


@Component({
  selector: 'app-status-details',
  templateUrl: './status-details.component.html',
  styleUrls: ['./status-details.component.css']
})
export class StatusDetailsComponent implements OnInit {
  public status: Status;
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  ngOnInit() {
    this.getStatus();
  }
  private getStatus = () =>{
    let id: number = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/Manager/statuses/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.status = res as Status;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }
}
