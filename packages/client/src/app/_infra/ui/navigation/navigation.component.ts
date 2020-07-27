import { Component, Input, OnInit } from '@angular/core';
import { NavButton } from '@core/models';

@Component({
  selector: 'ui-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  @Input() navButtons: NavButton[];

  constructor() { }

  ngOnInit() {
  }

}
