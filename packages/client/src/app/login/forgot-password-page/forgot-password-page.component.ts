import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService, LoginService } from '@core/services';

@Component({
  selector: 'dsapp-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styles: []
})
export class ForgotPasswordPageComponent implements OnInit {


  forgotPasswordForm: FormGroup;
  isSubmitted = false;
  isSend = false;
  token: string;

  get formControls() { return this.forgotPasswordForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) {
        /// user has reset token from email
    }
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  resetPassword() {
    this.isSubmitted = true;

    if (this.forgotPasswordForm.invalid) {
      this.isSubmitted = false;
      return;
    }

    this.loginService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      res => {
        if (res.success) {
          this.isSend = true;
          this.isSubmitted = false;
        } else if (res.errors) {
          res.errors.forEach(err => {
            const errorStr = `LOGIN.FORM.${err.code}`;
            this.alertService.error(errorStr);
          });
          this.isSubmitted = false;

        } else {
          this.isSubmitted = false;
          this.alertService.error('LOGIN.ResetPasswordFailedMsg');
        }
      },
      error => {
        this.isSubmitted = false;
        this.alertService.error('LOGIN.ResetPasswordFailedMsg');
      }
    );
  }

}
