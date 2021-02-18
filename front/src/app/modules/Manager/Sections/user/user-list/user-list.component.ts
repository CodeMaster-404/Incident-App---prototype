import { User } from './../../../interfaces/User.Model';
import { RepositoryService } from '../../../shared/repository.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from '../../../../../shared/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['id', 'firstName', 'lastName','email','phoneNumber', 'details', 'update',];
  public dataSource = new MatTableDataSource<User>();
  constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router) { }
  ngOnInit() {
    this.getAllUsers();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public getAllUsers = () => {
    this.repoService.getData('api/users')
    .subscribe(res => {
      this.dataSource.data = res as User[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }
  public redirectToDetails = (id: string) => {
    let url: string = `/user/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {
    let url: string = `/user/update/${id}`;
    this.router.navigate([url]);
  }

}

