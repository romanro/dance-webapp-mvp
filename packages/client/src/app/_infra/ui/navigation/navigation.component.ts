import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NavButton } from '@core/models';

@Component({
  selector: 'ui-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  @Input() navButtons: NavButton[];
  userScrolled = false;

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.detectScrollPosition();
  }


  ngOnInit() {
  }

  detectScrollPosition() {
    this.userScrolled = document.documentElement.scrollTop > 80;
  }

}
