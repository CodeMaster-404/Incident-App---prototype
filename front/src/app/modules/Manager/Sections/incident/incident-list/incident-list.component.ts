import { MatIconModule } from '@angular/material/icon';
import { Status } from './../../../interfaces/Status.Model';
import { Incident } from './../../../interfaces/Incident.Model';
import { RepositoryService } from '../../../shared/repository.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from '../../../../../shared/error-handler.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../../Manager/interfaces/User.Model';

import 'jspdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  form!: FormGroup;
  private filteredIncidents: Incident[] = [];
  private incidents: Incident[] = [];
  public users: User[] = [];
  public technicians: User[] = [];
  public statuses: Status[] = [];
  public dateValues: any [] = [];
  public reportDate: any = Date.now();


  public displayedColumns = ['id', 'location', 'description','date_Logged','status','user','technician','Action',];
  public dataSource = new MatTableDataSource<Incident>();
  constructor(private fb: FormBuilder, private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router) { }
  ngOnInit() {
    this.getAllIncidents();
    this.getAllUsers();
    this.getAllTechs();
    this.getAllStatuses();
    this.form = new FormGroup({
      user: new FormControl(),
      status: new FormControl(),
      start: new FormControl(),
      end: new FormControl()
    });
  }

  onSubmit(){
    console.log(this.form.value);
  }

  onCancel() {
    this.dataSource.data = this.incidents as Incident[];
  }

  public filterIncidents = (formValue) => {

    this.filteredIncidents = this.incidents;
    //all filter values are null
    if(formValue.user == null && formValue.status == null && formValue.start == null && formValue.end == null)
    {
      this.dataSource.data = this.incidents as Incident[];
    }
    //only user is not null
    else if(formValue.user != null && formValue.start == null && formValue.end == null && formValue.status == null)
    {
      this.filteredIncidents =  this.incidents.filter(e => e.user.id == formValue.user);
      this.dataSource.data = this.filteredIncidents as Incident[];
    }
    //only status is not null
    else if(formValue.user == null && formValue.start == null && formValue.end == null && formValue.status != null)
    {
      this.filteredIncidents =  this.incidents.filter(e => e.status.id == formValue.status);
      this.dataSource.data = this.filteredIncidents as Incident[];
    }
    //only the date range is not null
    else if(formValue.user == null && formValue.start != null && formValue.end != null && formValue.status == null)
    {
      this.filteredIncidents =  this.incidents.filter(e => new Date(e.date_Logged) >= new Date(formValue.start) && new Date(e.date_Logged) <= new Date(formValue.end));
      this.dataSource.data = this.filteredIncidents as Incident[];
    }
    //only user and date are defined
    else if(formValue.user != null && formValue.start != null && formValue.end != null && formValue.status == null)
    {
      this.filteredIncidents =  this.incidents.filter(e =>e.user.id == formValue.user && new Date(e.date_Logged) >= new Date(formValue.start) && new Date(e.date_Logged) <= new Date(formValue.end));
      this.dataSource.data = this.filteredIncidents as Incident[];
    }
    //only status and date are defined
    else if(formValue.user == null && formValue.start != null && formValue.end != null && formValue.status != null)
    {
      this.filteredIncidents =  this.incidents.filter(e =>e.status.id == formValue.status && new Date(e.date_Logged) >= new Date(formValue.start) && new Date(e.date_Logged) <= new Date(formValue.end));
      this.dataSource.data = this.filteredIncidents as Incident[];
    }
    //only status and user are defined
    else if(formValue.user != null && formValue.start == null && formValue.end == null && formValue.status != null)
    {
      this.filteredIncidents =  this.incidents.filter(e => e.status.id == formValue.status && e.user.id == formValue.user);
      this.dataSource.data = this.filteredIncidents as Incident[];
    }
    //everything form value is given
    else
    {
      this.filteredIncidents =  this.incidents.filter(e => e.user.id == formValue.user && e.status.id == formValue.status && new Date(e.date_Logged) >= new Date(formValue.start) && new Date(e.date_Logged) <= new Date(formValue.end));
      this.dataSource.data = this.filteredIncidents as Incident[];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getAllIncidents = () => {
    this.repoService.getData('api/Manager/incidents')
    .subscribe(res => {
      this.dataSource.data = res as Incident[];
      this.incidents = res as Incident[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }
  public redirectToUpdate = (id: number) => {
    let url: string = `/Manager/incident/update/${id}`;
    console.log(id);
    this.router.navigate([url]);
  }


  //filter funtions
  public getAllStatuses = () => {
    this.repoService.getData('api/Manager/statuses')
    .subscribe(res => {
      this.statuses = res as Status[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  public getAllUsers = () => {
    this.repoService.getData('api/Manager/users')
    .subscribe(res => {
      this.users = res as User[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  public convetToPDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Report_'+ this.reportDate + '.pdf'); // Generated PDF

    });
  }


  public getAllTechs = () => {
    this.repoService.getData('api/Manager/technicians')
    .subscribe(res => {
      this.technicians = res as User[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }
}
