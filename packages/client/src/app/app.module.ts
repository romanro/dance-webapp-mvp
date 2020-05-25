import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from '@app/login/login.module';
import { StudentModule } from '@app/student/student.module';
import { InfraModule } from '@infra/infra.module';
import { StarsContentReducer, StarsReducer, UserReducer, PracticesReducer } from '@infra/store/reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocialLoginModule } from 'angularx-social-login';

import { StarsContentEffects, StarsEffects, UserEffects, PracticesEffects } from './_infra/store/effects';
import { AboutDanskillModalComponent, VideoPlayerModalComponent } from './_infra/ui';
import { APP_PROVIDERS } from './app-providers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json?ob=' + new Date().getTime());
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [...APP_PROVIDERS],
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
    StoreModule.forRoot({ user: UserReducer, stars: StarsReducer, starsContent: StarsContentReducer, practices: PracticesReducer }),
    EffectsModule.forRoot([UserEffects, StarsEffects, StarsContentEffects, PracticesEffects]),
    SocialLoginModule,
    NgbModule,
    AppRoutingModule,
    InfraModule,
    LoginModule,
    StudentModule
  ],
  entryComponents: [
    AboutDanskillModalComponent,
    VideoPlayerModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
