import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StarNameDirective } from '@core/directives';
import { TranslateModule } from '@ngx-translate/core';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';

import {
  AboutDanskillModalComponent,
  AlertsComponent,
  HeaderComponent,
  LogoComponent,
  NavigationComponent,
  NotificationsPageComponent,
  PageNotFoundComponent,
  PreloaderIconComponent,
  VideoPlayerWrapperComponent,
} from './ui';


@NgModule({
  imports: [
    CommonModule, TranslateModule, RouterModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [
    AlertsComponent, PageNotFoundComponent, NotificationsPageComponent,
    NavigationComponent, HeaderComponent, AboutDanskillModalComponent,
    LogoComponent, PreloaderIconComponent, VideoPlayerWrapperComponent, StarNameDirective
  ],
  exports: [
    AlertsComponent, PageNotFoundComponent, NotificationsPageComponent,
    NavigationComponent, HeaderComponent, AboutDanskillModalComponent,
    LogoComponent, PreloaderIconComponent, VideoPlayerWrapperComponent, StarNameDirective
  ]
})
export class InfraModule { }
