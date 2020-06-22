import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

declare let gtag: any;
@Component({
  selector: 'dsapp-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  route = '';
  subs: Array<Subscription> = [];


  constructor(
    public translate: TranslateService,
    public router: Router,
    public location: Location
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.subs.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.route = location.pathname === '/' ? '' : location.pathname;
          gtag('config', environment.googleAnalyticsID, { 'page_path': event.urlAfterRedirects });
        }
      })
    );

  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
