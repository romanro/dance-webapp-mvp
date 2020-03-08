import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@app/_infra/core/models';
import * as selectors from '@app/_infra/store/selectors/user.selectors';
import * as UserActions from '@infra/store/actions/user.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-student-profile-page',
  templateUrl: './student-profile-page.component.html',
  styles: []
})
export class StudentProfilePageComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  user: User = null;

  constructor(private store: Store<any>) { }

  ngOnInit() {


    this.subs.push(
      this.store.select(
        selectors.selectCurrentUser()).subscribe(res => {
          if (res) {
            this.user = { ...res };
          } else {
            this.store.dispatch(UserActions.BeginGetUserAction());
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
