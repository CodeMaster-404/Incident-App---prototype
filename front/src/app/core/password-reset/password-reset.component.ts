
import {ResetService} from '../services/reset.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { PasswordValidatorService } from 'src/app/modules/auth/Validators/password-validator.service';
import { resetConfirm } from '../models/user.model';
import{ReactiveFormsModule} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

   
  private userId = '';
  private code = '';
  public errorMessage = '';
   public showError = false;
  public ResetPasswordForm: FormGroup = new FormGroup({
     password: new FormControl('', [Validators.required, Validators.minLength(8)]),
     confirmPassword :new FormControl('', [Validators.required, ])
    

    
   });
  
   

  constructor(
    private route: ActivatedRoute,
    private passwordValidator: PasswordValidatorService,
    private ResetService:ResetService, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.userId = this.route.snapshot.queryParams.id || null;
    this.code = this.route.snapshot.queryParams.code || null;


    console.log('User id: ' + this.userId + ' Code: ' + this.code);

    this.ResetPasswordForm.controls.confirmPassword.setValidators([Validators.required,
      this.passwordValidator.validateConfirmPassword(this.ResetPasswordForm.controls.password)]);

    }


      public validateControl = (controlName: string) => {
        return this.ResetPasswordForm.controls[controlName].invalid && this.ResetPasswordForm.controls[controlName].touched;
      }
    
       public hasError = (controlName: string, errorName: string) => {
       return this.ResetPasswordForm.controls[controlName].hasError(errorName);
       
      }
      public onSubmit(): void {
        this.showError = false;
        const request:  resetConfirm= {
         
          password: this.ResetPasswordForm.controls.password.value,
          id:this.userId,
          code:this.code

        };

        //const newPassword = this.ResetPasswordForm.controls.newPassword.value
       // const confirmPassword  =this.ResetPasswordForm.controls.confirmPassword.value
        

          
    // this.ResetService.confirm({ id: this.userId, code: this.code })
    //   .subscribe(res => {
    //     console.log(res);
    //   }, error => {
    //     console.log(error);
    //   });


      this.ResetService.confirm(request).subscribe( data => {
        this.toastr.success('password has been changed successfully!', 'Success!');
        this.router.navigate(['/auth/login']);
        console.log('password has been reset');
      }, (error: any) => {
        console.log(error);

        this.errorMessage = error;
        this.showError = true;
      });

  }
  }


