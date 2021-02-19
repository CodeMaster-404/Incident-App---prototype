import { RegisterRequest } from './../../models/Requests.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidatorService } from '../../Validators/password-validator.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { RegConfirmDialogComponent } from '../reg-confirm-dialog/reg-confirm-dialog.component';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public errorMessage = '';
  public showError = false;
  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.maxLength(60)]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private passwordValidator: PasswordValidatorService,
    private router: Router,
    private avRoute: ActivatedRoute,
    public dialog: MatDialog,
    private alertService: AlertService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm.controls.confirm.setValidators([Validators.required,
      this.passwordValidator.validateConfirmPassword(this.registerForm.controls.password)]);

  }

  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  // openDialog(){
  //   const dialogRef = this.dialog.open(RegConfirmDialogComponent,{
  //     width: '350px',
  //   });
  // }

  public onSubmit(): void {
    this.showError = false;
    const request: RegisterRequest = {
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      email: this.registerForm.controls.email.value,
      phoneNumber: this.registerForm.controls.phoneNumber.value,
      password: this.registerForm.controls.password.value,
      roleId: 1
    };
      // openDialog(){
      //   const dialogRef = this.dialog.open(RegConfirmDialogComponent,{
      //     width: '350px',
      //   });
      // }
      //Dialog
      const confirmDialog = this.dialog.open(RegConfirmDialogComponent, {
        data: {
           title: 'Confirm Registration',
           message: 'Are you sure, you want to Register '
        }
      });

      confirmDialog.afterClosed().subscribe(result => {
        if (result === true) {
          //this.employeeList = this.employeeList.filter(item => item.employeeId !== employeeObj.employeeId);
            this.authService.register(request).subscribe( data => {
            this.toastr.success('Registration successful, please check your email for verification instructions', 'Success!');
            this.registerForm.reset();
            this.router.navigate(['/auth/register']);
           
          }, (error: any) => {
            console.log(error);
            this.toastr.error('Email Already Exist,Please use a Different email address','Invalid Email');
            this.errorMessage = error;
            this.showError = true;
          });
        }
      });
    }
      //end

     
}
