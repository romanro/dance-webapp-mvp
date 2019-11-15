import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, TokenService } from '@core/services';


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
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router
  ) { }


  ngOnInit() {

    /// if token exist in local store - redirect user
    if (this.tokenService.checkStoredToken()) { this.router.navigate(['/student']); }


    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
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
