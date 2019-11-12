import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dsapp-student-upic',
  templateUrl: './student-upic.component.html',
  styles: []
})
export class StudentUpicComponent implements OnInit {

  @Input() picUrl: string = null;
  @Output() picChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  picUrlIsChanged(url: string) {
    this.picChange.emit(url);
  }

}
