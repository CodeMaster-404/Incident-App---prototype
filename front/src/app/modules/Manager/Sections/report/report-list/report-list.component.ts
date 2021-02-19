import { Report } from './../../../interfaces/Report.Model';
import { RepositoryService } from '../../../shared/repository.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
// import { ErrorHandlerService } from 'src/app/Manager/shared/error-handler.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../shared/error-handler.service';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit/*,AfterViewInit*/ {

  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['report_ID', 'report_Request', 'report_Description', 'details'];
  public dataSource = new MatTableDataSource<Report>();
  constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router) { }
  ngOnInit() {
    this.getAllReports();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }

  public getAllReports = () => {
    this.repoService.getData('api/reports')
    .subscribe(res => {
      this.dataSource.data = res as Report[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }
  public redirectToDetails = (id: number) => {
    let url: string = `/report/details/${id}`;
    this.router.navigate([url]);
  }

}
