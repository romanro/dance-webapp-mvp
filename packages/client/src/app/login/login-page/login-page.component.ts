import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@core/services/login.service';


@Component({
  selector: 'dsapp-login-page',
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;

  get formControls() { return this.loginForm.controls; }

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    /*
    // get facebook logged in user if needed
    this.subs.push(this.authService.authState.subscribe(
      (user) => {
        if (user) {
          // console.log(user);
          // this.alertService.success('LOGIN.LoginSuccessMsg');
          // this.router.navigate(['/student']);
        }
      },
      (error) => {
        this.alertService.error('LOGIN.LoginFailedMsg');
      }
    ));
    */

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }


  login() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      this.isSubmitted = false;
      return;
    }

    this.loginService.login(this.loginForm.value);
    setTimeout(() => { this.isSubmitted = false; }, 1500);
  }

  loginFacebook() {
    this.loginService.loginFacebook();
  }

}
