import { Task } from './../../../interfaces/Task.Model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../../shared/repository.service';
import { ErrorHandlerService } from '../../../shared/error-handler.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  public task: Task | undefined;
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  ngOnInit() {
    this.getTask();
  }
  private getTask = () =>{
    let id: number = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/Manager/tasks/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.task = res as Task;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }
}
