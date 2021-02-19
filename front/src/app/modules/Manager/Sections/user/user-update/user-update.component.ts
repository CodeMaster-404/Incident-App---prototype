import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { User } from '../../../../Manager/interfaces/User.Model';
import { RepositoryService } from '../../../shared/repository.service';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { SuccessDialogComponent } from '../../../shared/dialogs/success-dialog/success-dialog.component';
import { Role } from '../../../../Manager/interfaces/Role.Model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  public userForm: FormGroup;
  private dialogConfig;
  public user: User;
  public roles: Role[];

  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      //role: new FormControl()
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }
    //this.getAllRoles();
    this.getUserById();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  /*public getAllRoles = () => {
    this.repository.getData('api/roles')
    .subscribe(res => {
      this.roles = res as Role[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }*/

  private getUserById = () => {
    let Id: number = this.activeRoute.snapshot.params['id'];

    let userByIdUrl: string = `api/users/${Id}`;

    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.user = res as User;
        this.userForm.patchValue(this.user);
      },
      (error) => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
  }

  public updateUser = (userFormValue) => {
    if (this.userForm.valid) {
      this.executeUserUpdate(userFormValue);
    }
  }

  private executeUserUpdate = (userFormValue) => {

    this.user.lastName = userFormValue.lastName;
    this.user.firstName = userFormValue.firstName;
    this.user.email = userFormValue.email;
    this.user.phoneNumber = userFormValue.phoneNumber;
    //this.user.roleId = userFormValue.role;

    let apiUrl = `api/users/${this.user.id}`;
    this.repository.update(apiUrl, this.user)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
      (error => {

        this.errorService.handleError(error);
      })
    )
  }

}
