import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsapp-practices-page',
  templateUrl: './practices-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PracticesPageComponent implements OnInit {

  loading = true;
  errorMsg: string = null;

  constructor() { }

  ngOnInit() {
  }

}
