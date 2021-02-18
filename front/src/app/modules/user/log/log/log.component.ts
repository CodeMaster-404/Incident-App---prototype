import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field'
import { IncidentsServicesService } from '../../services/incidents-services.service';
import { Incident, Incidents } from 'src/app/core/models/incident.model';
import { AuthService } from '../../../../modules/auth/services/auth.service'
import { LogConfirmDialogComponent } from '../../log-confirm-dialog/log-confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  @Input() profileMenu = false;
  @Output() profileMenuOutput = new EventEmitter<boolean>();
  firstName = '';
  lastName = '';

  actionType!: string;
  formincident_Description: string;
  formincident_Location: string;
  formincident_ID: any;
  formincident_Status_Id: any;
  formincident_User_Id: any;
  errorMessage: any;
  //formincidentStatu_Id: any;
  formincident_User: any;
  formincidentStatusDes: any;
  isLoadingResults = false;

  // public logForm: FormGroup = new FormGroup({
  //   Description: new FormControl('', [Validators.required, Validators.minLength(4)]),
  //   Location: new FormControl('', [Validators.required, Validators.minLength(4)]),
  // });

  form =new FormGroup({
    'Id' : new FormControl(),
    'Description' : new FormControl('',[ Validators.required, Validators.minLength(4)]),
    'Location' : new FormControl('', [Validators.required]),
    'Date_Logged' : new FormControl([Date.now, null]),
    'Status_Id' : new FormControl(0),
    'User_Id' : new FormControl(0),
    'incidentStatus': new FormControl('Open'),
    //'incident_User': new FormControl('user'),
    //'incident_Technician_ID' : new FormControl(110)
  });
  matcher = new MyErrorStateMatcher();
  constructor(private authService: AuthService, public dialog: MatDialog, 
    public matProgres: MatProgressSpinnerModule, public formField: MatFormFieldModule, 
    public matCard: MatCardModule, private incidentService: IncidentsServicesService, 
    private  formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private toastr: ToastrService){
    const idParam = 'id';
    this.actionType = 'Add';
    this.formincident_ID ='incident_ID';
    this.formincident_Description = 'incident_Description';
    this.formincident_Location = 'incident_Location';
    this.formincident_Status_Id = 'incidet_status';
    this.formincident_User_Id = 'incident_user';
    //this.formincidentStatus = 'open';
    //this.formincident_User = 'user';
    this.formincidentStatusDes = 'Open';
    if (this.avRoute.snapshot.params[idParam]) {
      this.formincident_ID = this.avRoute.snapshot.params[idParam];
    }

}


  ngOnInit(): void {
    
  }

  //Saving an incident 
  save() {
    
    this.authService.User.subscribe(authState => {
      if (authState) {
        this.formincident_User = authState.id;
       } 
       else {
         this.formincident_User='';
      }
    });
    
    
    if (!this.form.valid) { 
      return;
    }
    this.isLoadingResults = true;
    let incidentsLogged: Incidents=
    {
      id: null,
      description: this.form.controls.Description.value,
      location: this.form.controls.Location.value,
      date_Logged: new Date(),
      statusId: 0,
      userId: this.formincident_User,
      incidentStatus: this.formincidentStatusDes,
      //incident_User: this.role,  
      incident_Technician_ID: 110
    };  

    const confirmDialog = this.dialog.open(LogConfirmDialogComponent,{
     data: {
       title: 'Confirm Incident log',
       message: 'Do you want to log this incident?' 
     }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true)
      {
        this.incidentService.saveIncident(incidentsLogged)
        .subscribe((data) => 
        {
          this.isLoadingResults = false;
          //this.toastr.success(); 
          this.toastr.success('Incident has been successfully logged!');
        })

      }
      else if(result=== false)
      {
        this.isLoadingResults = false;
        this.toastr.error('Incident has been canceled!');
        this.router.navigate(['/']);
       
      }
      
    });
    
    this.form.reset();
  }

  public validateControl = (controlName: string) => {
    return this.form.controls[controlName].invalid && this.form.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  cancel() {
    this.router.navigate(['/']);
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}