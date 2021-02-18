import { Task } from './../../../interfaces/Task.Model';
import { RepositoryService } from '../../../shared/repository.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public displayedColumns = ['task_ID', 'task_Status', 'incident','technician','details', 'update',];
  public dataSource = new MatTableDataSource<Task>();
  constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router) { }
  ngOnInit() {
    this.getAllIncidents();
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public getAllIncidents = () => {
    this.repoService.getData('api/Manager/tasks')
    .subscribe(res => {
      this.dataSource.data = res as Task[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }
  public redirectToUpdate = (id: number) => {

  }

}
