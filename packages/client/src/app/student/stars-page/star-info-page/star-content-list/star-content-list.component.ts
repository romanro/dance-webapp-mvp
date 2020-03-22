import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dsapp-star-content-list',
  templateUrl: './star-content-list.component.html'
})
export class StarContentListComponent implements OnInit {

  @Input() starId: string;

  constructor() { }

  ngOnInit() {
  }

}
