import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {LoginRequest} from '../models/login-request';

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

   constructor() { }

   ngOnInit() {
     this.formData = new LoginRequest();
   }


  onLogin(form: NgForm) {

    if (form.valid) {

      // store the form data in the browser session storage
      // this.sessionStorageService.setItem('requestDemoTenantData',this.formData);

      // this.router.navigateByUrl('success');
      console.log('valid',this.formData);


    } else {
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        console.log('control errors', control.errors);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  verifyField(fieldName: string, validatorName: string): boolean {
    return !(this.form.controls[fieldName] && this.form.controls[fieldName].touched && this.form.controls[fieldName].errors && this.form.controls[fieldName].errors[validatorName]);
  }
}
