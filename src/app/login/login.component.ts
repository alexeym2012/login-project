import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {LoginRequest} from '../models/login-request';
import {ApiService} from '../api.service';
import {ELoginResponse} from '../models/login-response';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
 export class LoginComponent implements OnInit {


  @ViewChild('loginForm') form: NgForm;

  formData: LoginRequest;

   constructor(private api: ApiService,
               private router: Router,
               public snackBar: MatSnackBar) { }

   ngOnInit() {
     this.formData = new LoginRequest();
   }


  onLogin(form: NgForm) {

    if (form.valid) {
      console.log('valid', this.formData);
      this.api.login(this.formData)
        .then(response => {

          switch (response) {
            case ELoginResponse.OK:

              this.router.navigateByUrl('/success');

              break;

            case ELoginResponse.BadCredentials:
            this.openSnackBar('wrong password', 'try again');
              // alert('wrong password');
              break;

            case ELoginResponse.UserBlocked:
            this.openSnackBar('The user has been blocked', 'contact administration');
              // alert('user blocked');
              break;

            case ELoginResponse.Error:
            this.openSnackBar('unexpected error', 'try again');
              // alert('unexpected error');
              break;
          }
        });

    } else {
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        console.log('control errors', control.errors);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  verifyField(fieldName: string, validatorName: string): boolean {
    return !(this.form.controls[fieldName]
      && this.form.controls[fieldName].touched
      && this.form.controls[fieldName].errors
      && this.form.controls[fieldName].errors[validatorName]);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
 }
}
