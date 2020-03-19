import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsapp-preloader-inapp',
  templateUrl: './preloader-inapp.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreloaderInappComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
