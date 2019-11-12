import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_infra/core/models';
import { UserState } from '@app/_infra/store/state';
import { AlertService, UserService } from '@core/services/';
import * as UserActions from '@infra/store/actions';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-student-profile-page',
  templateUrl: './student-profile-page.component.html',
  styles: []
})
export class StudentProfilePageComponent implements OnInit, OnDestroy {
  user$: Observable<UserState>;
  subs: Subscription[] = [];
  user: User = null;

  constructor(
    private store: Store<UserState>,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {
    // @ts-ignore
    this.user$ = store.pipe(select('user'));
  }

  ngOnInit() {
    window.location.href = '/account';

    // this.subs.push(
    //   this.user$.subscribe(res => {
    //     if (res.user) {
    //       this.user = { ...res.user };
    //     } else {
    //       // rewrite to effects;
    //       const authData = JSON.parse(localStorage.getItem('authData'));
    //       if (authData && authData.userId) {
    //         this.userService.getUser(authData.userId).subscribe(
    //           res => {
    //             this.user = res[0];
    //             this.store.dispatch(
    //               UserActions.CreateUserAction({ user: this.user })
    //             );
    //           },
    //           error => {
    //             this.alertService.success('ERRORS.SessionIsExpired');
    //             this.router.navigate(['/login']);
    //           }
    //         );
    //       } else {
    //         this.alertService.success('ERRORS.SessionIsExpired');
    //         this.router.navigate(['/login']);
    //       }
    //     }
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
