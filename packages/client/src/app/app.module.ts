import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from '@app/login/login.module';
import { StarModule } from '@app/star/star.module';
import { StudentModule } from '@app/student/student.module';
import { InfraModule } from '@infra/infra.module';
import { DancesReducer, FiguresReducer, StarsReducer, UserReducer } from '@infra/store/reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocialLoginModule } from 'angularx-social-login';

import { DancesEffects, FiguresEffects, StarsEffects } from './_infra/store/effects';
import { AboutDanskillModalComponent, VideoPlayerModalComponent } from './_infra/ui';
import { APP_PROVIDERS } from './app-providers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
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
    StoreModule.forRoot({ user: UserReducer, stars: StarsReducer, dances: DancesReducer, figures: FiguresReducer }),
    EffectsModule.forRoot([StarsEffects, DancesEffects, FiguresEffects]),
    SocialLoginModule,
    NgbModule,
    AppRoutingModule,
    InfraModule,
    LoginModule,
    StudentModule,
    StarModule
  ],
  entryComponents: [
    AboutDanskillModalComponent,
    VideoPlayerModalComponent
  ],
  providers: [...APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
