import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDateStructTodateDirective, StarNameDirective } from '@core/directives';
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
  VideoPlayerModalComponent,
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
    NavigationComponent, HeaderComponent, AboutDanskillModalComponent, VideoPlayerModalComponent,
    LogoComponent, PreloaderIconComponent, VideoPlayerWrapperComponent, StarNameDirective, NgbDateStructTodateDirective
  ],
  exports: [
    AlertsComponent, PageNotFoundComponent, NotificationsPageComponent,
    NavigationComponent, HeaderComponent, AboutDanskillModalComponent, VideoPlayerModalComponent,
    LogoComponent, PreloaderIconComponent, VideoPlayerWrapperComponent, StarNameDirective, NgbDateStructTodateDirective
  ]
})
export class InfraModule { }
