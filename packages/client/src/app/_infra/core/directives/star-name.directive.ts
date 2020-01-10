import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { Name } from '../models';

@Directive({
  selector: '[dsappStarName]'
})
export class StarNameDirective implements OnInit {

  @Input() name: Name;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    let formatedName = this.name.firstName;
    if (this.name.midName) {
      formatedName = `${formatedName} ${this.name.midName}`;
    }
    if (this.name.nickname) {
      formatedName = `${formatedName} (${this.name.nickname})`;
    }

    formatedName = `${formatedName} ${this.name.lastName}`;

    this.elementRef.nativeElement.innerHTML = formatedName;
  }

}
