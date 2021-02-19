import { Incident } from './../../../interfaces/Incident.Model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { User } from '../../../interfaces/User.Model';
import { RepositoryService } from '../../../shared/repository.service';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { SuccessDialogComponent } from '../../../shared/dialogs/success-dialog/success-dialog.component';


@Component({
  selector: 'app-incident-update',
  templateUrl: './incident-update.component.html',
  styleUrls: ['./incident-update.component.css']
})
export class IncidentUpdateComponent implements OnInit {
  public incidentForm: FormGroup;
  public incident: Incident;
  private dialogConfig;
  public selectedTech: User;
  public technicians: User[];

  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }


  ngOnInit() {
    this.incidentForm = new FormGroup({
      tech: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }

    this.getIncidentById();
    this.getAllTechs();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.incidentForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  private getIncidentById = () => {
    let Id: number = this.activeRoute.snapshot.params['id'];
    let userByIdUrl: string = `api/Manager/incidents/${Id}`;

    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.incident = res as Incident;
        this.incidentForm.patchValue(this.incident);
      },
      (error) => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
  }

  public getAllTechs = () => {
    this.repository.getData('api/Manager/technicians')
    .subscribe(res => {
      this.technicians = res as User[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  public updateIncident = (incidentFormValue) => {
    if (this.incidentForm.valid) {
      this.getTechById(incidentFormValue.tech);
    }
  }
  public getTechById(techId){
    let apiUrl: string = `api/Manager/users/${techId}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.selectedTech = res as User;
      this.executeUserUpdate(this.selectedTech)
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }


  //add form controls for incident column
  private executeUserUpdate = (selectedTech) => {
    this.incident.technicianId = selectedTech.id;

    let apiUrl = `api/Manager/incidents/${this.incident.id}`;
    this.repository.update(apiUrl, this.incident)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
      (error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
    )
  }


}
