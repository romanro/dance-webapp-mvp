import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender, Language, User } from '@app/_infra/core/models';
import * as UserActions from '@app/_infra/store/actions/user.actions';
import { UserState } from '@app/_infra/store/state';
import { AlertService, UserService } from '@infra/core/services';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-student-edit-profile-page',
  templateUrl: './student-edit-profile-page.component.html',
  styles: []
})
export class StudentEditProfilePageComponent implements OnInit, OnDestroy {
  user$: Observable<UserState>;
  subs: Subscription[] = [];
  user: User = null;

  changeProfileForm: FormGroup;
  isSubmitted = false;

  keys = Object.keys;
  languages = Language;
  genders = Gender;

  get formControls() {
    return this.changeProfileForm.controls;
  }

  constructor(
    private router: Router,
    private alertService: AlertService,
    private store: Store<UserState>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    // @ts-ignore
    this.user$ = store.pipe(select('user'));
  }

  ngOnInit() {
    this.initForm();
    this.subs.push(
      // @ts-ignore
      this.user$.subscribe(res => {
        if (res.user) {
          this.user = { ...res.user };
          this.setFormControls();
        } else {
          // rewrite to effects;
          const authData = JSON.parse(localStorage.getItem('authData'));
          if (authData && authData.userId) {
            this.userService.getUser(authData.userId).subscribe(
              result => {
                this.user = result[0];
                this.store.dispatch(
                  UserActions.CreateUserAction({ user: this.user })
                );
                this.changeProfileForm.get('birthDate').clearValidators();
                this.changeProfileForm
                  .get('birthDate')
                  .updateValueAndValidity();
              },
              error => {
                this.alertService.success('ERRORS.SessionIsExpired');
                this.router.navigate(['/login']);
              }
            );
          } else {
            this.alertService.success('ERRORS.SessionIsExpired');
            this.router.navigate(['/login']);
          }
        }
      })
    );
  }

  initForm() {
    this.changeProfileForm = this.formBuilder.group({
      email: { value: '', disabled: true },
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: [null],
      language: [Language.english],
      gender: [''],
      about: ['']
    });
  }

  saveProfile() {
    this.isSubmitted = true;

    if (this.changeProfileForm.invalid) {
      this.isSubmitted = false;
      return;
    }

    this.userService
      .patchUser(this.user.email, this.changeProfileForm.value)
      .subscribe(
        res => {
          if (res) {
            this.store.dispatch(UserActions.UpdateUserAction({ user: res }));
            this.alertService.success('STUDENT.PROFILE.ProfileSaveSuccess');
            this.router.navigate(['/student/profile']);
          } else {
            this.alertService.error('STUDENT.PROFILE.ProfileSaveError');
          }
        },
        error => {
          this.alertService.error('STUDENT.PROFILE.ProfileSaveError');
        }
      );

    setTimeout(() => {
      this.isSubmitted = false;
    }, 3000);
  }

  cancel() {
    this.router.navigate(['/student/profile']);
  }

  setFormControls() {
    this.changeProfileForm.controls['email'].setValue(
      !this.user.email ? '' : this.user.email
    );
    this.changeProfileForm.controls['firstName'].setValue(
      !this.user.firstName ? '' : this.user.firstName
    );
    this.changeProfileForm.controls['lastName'].setValue(
      !this.user.lastName ? '' : this.user.lastName
    );
    this.changeProfileForm.controls['birthDate'].setValue(
      !this.user.birthDate ? '' : this.user.birthDate
    );
    this.changeProfileForm.controls['language'].setValue(
      !this.user.language ? Language.english : this.user.language
    );
    this.changeProfileForm.controls['gender'].setValue(
      !this.user.gender ? '' : this.user.gender
    );
    this.changeProfileForm.controls['about'].setValue(
      !this.user.about ? '' : this.user.about
    );
    setTimeout(() => {
      this.changeProfileForm.get('birthDate').clearValidators();
      this.changeProfileForm.get('birthDate').updateValueAndValidity();
    }, 500);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
