import { Report } from './../../../interfaces/Report.Model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../../shared/repository.service';
import { ErrorHandlerService } from '../../../shared/error-handler.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {
  public report: Report;
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  ngOnInit() {
    this.getReport();
  }
  private getReport = () =>{
    let id: number = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/reports/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.report = res as Report;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }
}
