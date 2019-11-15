import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dsapp-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styles: []
})
export class ForgotPasswordPageComponent implements OnInit {


  forgotPasswordForm: FormGroup;
  isSubmitted = false;

  get formControls() { return this.forgotPasswordForm.controls; }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  resetPassword() {

  }

}
