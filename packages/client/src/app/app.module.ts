import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from '@app/login/login.module';
import { StudentModule } from '@app/student/student.module';
import { InfraModule } from '@infra/infra.module';
<<<<<<< HEAD
import { FiguresReducer, PracticesReducer, StarsContentReducer, StarsReducer, UserReducer } from '@infra/store/reducers';
=======
import { PracticesEffects, StarsContentEffects, StarsEffects, UserEffects } from '@infra/store/effects';
import { LabReducer, PracticesReducer, StarsContentReducer, StarsReducer, UserReducer } from '@infra/store/reducers';
>>>>>>> c047d488f7a3b6cf4a0e98d9d6efe12d85ec219e
import { AboutDanskillModalComponent, VideoPlayerModalComponent } from '@infra/ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocialLoginModule } from 'angularx-social-login';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { FiguresEffects, PracticesEffects, StarsContentEffects, StarsEffects, UserEffects } from './_infra/store/effects';
import { APP_PROVIDERS } from './app-providers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json?ob=' + new Date().getTime());
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
<<<<<<< HEAD
    StoreModule.forRoot({
      user: UserReducer,
      stars: StarsReducer,
      starsContent: StarsContentReducer,
      practices: PracticesReducer,
      figures: FiguresReducer
    }),
    EffectsModule.forRoot([UserEffects, StarsEffects, StarsContentEffects, PracticesEffects, FiguresEffects]),
=======
    StoreModule.forRoot(
      {
        user: UserReducer,
        stars: StarsReducer,
        starsContent: StarsContentReducer,
        practices: PracticesReducer,
        lab: LabReducer
      }
    ),
    EffectsModule.forRoot([UserEffects, StarsEffects, StarsContentEffects, PracticesEffects]),
>>>>>>> c047d488f7a3b6cf4a0e98d9d6efe12d85ec219e
    SocialLoginModule,
    NgbModule,
    DeviceDetectorModule,
    AppRoutingModule,
    InfraModule,
    LoginModule,
    StudentModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    AboutDanskillModalComponent,
    VideoPlayerModalComponent
  ],
  providers: [...APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
