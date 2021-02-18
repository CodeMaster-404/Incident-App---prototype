import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Incident, Incidents } from 'src/app/core/models/incident.model';
import { IncidentsServicesService } from '../../services/incidents-services.service';
import { AuthService } from '../../../../modules/auth/services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() profileMenu = false;
  @Output() profileMenuOutput = new EventEmitter<boolean>();
  firstName = '';
  lastName = '';
  role = '';
  userid ='';
  isLoadingResults = false;
  //incidents: any;
  displayedColumns: string[] = ['Location', 'Description', 'Date Logged', 'Status', 'Actions'];
  //dataSourceOpen: Incidents[] = [];
  dataSourceClosed: Incidents[] = [];
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //listData = new MatTableDataSource(this.dataSourceOpen)
  //private dataSourceOpen = new MatTableDataSource();
  constructor(
    private incidentService: IncidentsServicesService,
    private router: Router,
    private authService: AuthService,
   ){

    }

    dataSourceOpen!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.loadIncidents();
  }


  loadIncidents()
  {
    this.authService.User.subscribe(authState => {
      if (authState) {
        this.userid = authState.id;
      } else {
        this.userid = '';
      }
    });
    this.incidentService.getIncidents(this.userid).subscribe( element => {
      console.log(element);
      const open: Incidents[] = [];
      const closed: Incidents[] = [];
      this.dataSourceOpen  = new MatTableDataSource(element);
      element.forEach(element => {
        if (element.statusId === 0  || element.statusId === 5) {
          open.push(element);
        } else if (element.incidentStatus.status_Description === 'Closed') {
          closed.push(element);
        }
      });
      //this.dataSourceOpen = element;

      //this.dataSourceClosed = closed;
      //this.incidents = element;

    });
  }
  // ngAfterViewInit() {
  //   this.dataSourceOpen.paginator = this.paginator;
  // }
  applyFilter(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOpen.filter = filterValue.trim().toLocaleLowerCase();
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/incident-edit', {id: id}]);
  }



}
