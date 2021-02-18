import { AuthenticateResponse } from './../../models/Responses.model';
import { AuthenticateRequest } from './../../models/Requests.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ApiResponse } from 'src/app/core/models/api.response.model';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private returnUrl = '';
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.authService.User.subscribe( authState => {
      if (authState) {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
        console.log('OnInit: Navigating to returnUrl');

        this.router.navigateByUrl(this.returnUrl);
      }
    });

  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(): void {

    const request: AuthenticateRequest = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };

    this.authService.authenticate(request).subscribe( (response: ApiResponse<AuthenticateResponse>) => {
      this.router.navigate([this.returnUrl]);
      console.log('Successful Login');
    }, error => {
      // console.log(error);
    });

  }

}
