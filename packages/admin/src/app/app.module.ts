import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarContentTabsComponent } from './star-content-tabs/star-content-tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    StarContentTabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/admin' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
