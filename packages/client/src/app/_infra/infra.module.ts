import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import {
  AboutDanskillModalComponent,
  AlertsComponent,
  HeaderComponent,
  LogoComponent,
  NavigationComponent,
  NotificationsPageComponent,
  PageNotFoundComponent,
  PreloaderIconComponent,
} from './ui';

@NgModule({
  imports: [

    CommonModule, TranslateModule, RouterModule
  ],
  declarations: [
    AlertsComponent, PageNotFoundComponent, NotificationsPageComponent,
    NavigationComponent, HeaderComponent, AboutDanskillModalComponent,
    LogoComponent, PreloaderIconComponent
  ],
  exports: [
    AlertsComponent, PageNotFoundComponent, NotificationsPageComponent,
    NavigationComponent, HeaderComponent, AboutDanskillModalComponent,
    LogoComponent, PreloaderIconComponent
  ]
})
export class InfraModule { }
