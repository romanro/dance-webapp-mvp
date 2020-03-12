import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender, Language, User, UserError } from '@app/_infra/core/models';
import { AlertErrorService } from '@app/_infra/core/services';
import * as UserActions from '@app/_infra/store/actions/user.actions';
import * as selectors from '@app/_infra/store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import t from 'typy';

@Component({
  selector: 'dsapp-student-edit-profile-page',
  templateUrl: './student-edit-profile-page.component.html'
})
export class StudentEditProfilePageComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  user: User = null;
  errorMsg: UserError | string = null;

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
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private errorService: AlertErrorService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(selectors.selectCurrentUser())
        .subscribe(res => {
          if (res) {
            this.user = { ...res };
            this.initForm();
          } else {
            this.store.dispatch(UserActions.BeginGetUserAction());
          }
        })
    );
    this.subs.push(
      this.store.select(selectors.selectCurrentUserError())
        .subscribe(res => {
          if (res && res.type) {
            this.errorMsg = this.errorService.alertUserError(res.type);
          }
        })
    );
  }

  initForm() {
    this.changeProfileForm = this.formBuilder.group({
      email: { value: this.user.email, disabled: true },
      name: this.formBuilder.group({
        firstName: [this.user.name.firstName, [Validators.required]],
        lastName: [this.user.name.lastName, [Validators.required]],
        midName: [t(this.user.name.lastName).isDefined ? t(this.user, 'name.lastName').safeObject : ''],
        nickname: [t(this.user.name.nickname).isDefined ? t(this.user, 'name.nickname').safeObject : '']
      }),
      birthDate: [t(this.user.birthDate.date).isDefined ? t(this.user, 'birthDate.date').safeObject : null],
      language: [Language.english],
      gender: [t(this.user.gender).isDefined ? this.user.gender : ''],
      about: [t(this.user.about).isDefined ? this.user.about : ''],
      userPic: [t(this.user.userPic).isDefined ? this.user.userPic : '']
    });

    setTimeout(() => {
      this.changeProfileForm.get('birthDate').clearValidators();
      this.changeProfileForm.get('birthDate').updateValueAndValidity();
    }, 500);
  }

  saveProfile() {

    if (this.changeProfileForm.invalid) {
      return;
    }

    this.isSubmitted = true;

    console.log(this.changeProfileForm.getRawValue());

    const payload = this.changeProfileForm.getRawValue();

    this.store.dispatch(UserActions.BeginUpdateUserAction({ payload }));

    /* this.userService
      .patchUser(this.user.email, this.changeProfileForm.value)
      .subscribe(
        res => {
          if (res) {
            /// this.store.dispatch(UserActions.UpdateUserAction({ user: res }));
            this.alertService.success('STUDENT.PROFILE.ProfileSaveSuccess');
            this.router.navigate(['/student/profile']);
          } else {
            this.alertService.error('STUDENT.PROFILE.ProfileSaveError');
          }
        },
        error => {
          this.alertService.error('STUDENT.PROFILE.ProfileSaveError');
        }
      ); */

    setTimeout(() => {
      this.isSubmitted = false;
    }, 3000);
  }

  cancel() {
    this.router.navigate(['/student/profile']);
  }

  /*setFormControls() {
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
  }*/

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
