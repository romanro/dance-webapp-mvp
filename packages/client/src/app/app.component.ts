import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from '@core/services';
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
    public location: Location,
    private menuService: MenuService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.subs.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // sending Google Analitics
          this.route = location.pathname === '/' ? '' : location.pathname;
          gtag('config', environment.googleAnalyticsID, { 'page_path': event.urlAfterRedirects });

          // closing menu
          this.menuService.setMenuOpenState(false);
        }
      })
    );

  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
