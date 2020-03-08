import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[dsappNgbDateStructTodate]'
})
export class NgbDateStructTodateDirective implements OnInit {

  @Input() dateStruct: NgbDateStruct;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const date = `${this.dateStruct.month}/${this.dateStruct.day}/${this.dateStruct.year}`;
    this.elementRef.nativeElement.innerHTML = date;
  }

}
