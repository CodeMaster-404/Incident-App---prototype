import { Incident } from './../../../interfaces/Incident.Model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../../shared/repository.service';
import { ErrorHandlerService } from '../../../shared/error-handler.service';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {
  public incident: Incident;
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  ngOnInit() {
    this.getIncident();
  }
  private getIncident = () =>{
    let id: number = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/Manager/incidents/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.incident = res as Incident;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }
}
