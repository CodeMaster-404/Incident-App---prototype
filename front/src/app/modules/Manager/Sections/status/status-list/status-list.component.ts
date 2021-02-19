import { Status } from './../../../interfaces/Status.Model';
import { RepositoryService } from '../../../shared/repository.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit, AfterViewInit  {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public displayedColumns = ['id', 'description', 'details', 'update',];
  public dataSource = new MatTableDataSource<Status>();
  constructor(private repoService: RepositoryService,
    private errorService: ErrorHandlerService, private router: Router) { }
  ngOnInit() {
    this.getAllStatuses();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllStatuses = () => {
    this.repoService.getData('api/Manager/statuses')
    .subscribe(res => {
      this.dataSource.data = res as Status[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }
  public redirectToDetails = (id: number) => {
    let url: string = `/Manager/status/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: number) => {

  }

}

