import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender, Language, User, UserError } from '@app/_infra/core/models';
import { AlertErrorService, AlertService } from '@app/_infra/core/services';
import * as UserActions from '@app/_infra/store/actions/user.actions';
import * as selectors from '@app/_infra/store/selectors/user.selectors';
import { UserActionType } from '@infra/store/actions';
import { Actions, ofType } from '@ngrx/effects';
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
    private errorService: AlertErrorService,
    private alertService: AlertService,
    actions$: Actions
  ) {
    this.subs.push(
      actions$.pipe(
        ofType(UserActionType.SuccessUpdateUserAction),
      ).subscribe(action => {
        this.alertService.success('STUDENT.PROFILE.ProfileSaveSuccess');
        this.router.navigate(['/student/profile']);
      })
    );
  }

  ngOnInit(): void {
    this.subs.push(
      this.store.select(selectors.selectCurrentUser())
        .subscribe(res => {
          if (res) {
            this.user = { ...res };
            this.initForm();
            this.errorMsg = null;
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
          setTimeout(() => {
            this.isSubmitted = false;
          }, 3000);
        })
    );

  }

  initForm(): void {
    this.changeProfileForm = this.formBuilder.group({
      email: { value: this.user.email, disabled: true },
      name: this.formBuilder.group({
        firstName: [this.user.name.firstName, [Validators.required]],
        lastName: [this.user.name.lastName, [Validators.required]],
        midName: [t(this.user.name.midName).isDefined ? t(this.user, 'name.midName').safeObject : ''],
        nickname: [t(this.user.name.nickname).isDefined ? t(this.user, 'name.nickname').safeObject : '']
      }),
      birthDate: this.formBuilder.group({
        date: [t(this.user.birthDate.date).isDefined ? t(this.user, 'birthDate.date').safeObject : null],
        group: [t(this.user.birthDate.group).isDefined ? t(this.user, 'birthDate.group').safeObject : null]
      }),
      language: [Language.english],
      gender: [t(this.user.gender).isDefined ? this.user.gender : ''],
      about: [t(this.user.about).isDefined ? this.user.about : ''],
      userPic: [t(this.user.userPic).isDefined ? this.user.userPic : '']
    });

    setTimeout(() => {
      this.changeProfileForm.get('birthDate').get('date').clearValidators();
      this.changeProfileForm.get('birthDate').get('date').updateValueAndValidity();
    }, 500);
  }

  userPicChanged(base64img: string): void {
    this.changeProfileForm.get('userPic').patchValue(base64img);
  }

  saveProfile(): void {

    if (this.changeProfileForm.invalid) {
      return;
    }

    this.isSubmitted = true;

    // console.log(this.changeProfileForm.getRawValue());

    const payload = this.changeProfileForm.getRawValue();

    this.store.dispatch(UserActions.BeginUpdateUserAction({ payload }));

  }

  cancel(): void {
    this.router.navigate(['/student/profile']);
  }


  tryAgain(): void {
    this.user = null;
    this.errorMsg = null;
    setTimeout(() => {
      this.store.dispatch(UserActions.BeginGetUserAction());
    }, 2000);

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
