import { Injectable } from '@angular/core';
import { UserActionType } from '@infra/store/actions';

import { UserError } from '../models';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AlertErrorService {

  constructor(private alertService: AlertService) { }

  alertUserError(errorType: UserActionType | string): UserError {
    // this.alertService.error('LOGIN.LoginFailedMsg');
    let errorMsg: UserError = UserError.GENERAL;
    switch (errorType) {
      case UserActionType.ErrorGetUserAction:
        errorMsg = UserError.GET;
        break;
      case UserActionType.ErrorUpdateUserAction:
        errorMsg = UserError.UPDATE;
        break;
    }

    this.alertService.error(errorMsg);
    return errorMsg;
  }

}
