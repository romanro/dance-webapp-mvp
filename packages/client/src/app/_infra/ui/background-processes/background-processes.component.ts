import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackgroundProcess, BackgroundProcessCallbackData } from '@core/models';
import { BackgroundProcessesService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-background-processes',
  templateUrl: './background-processes.component.html'
})
export class BackgroundProcessesComponent implements OnInit, OnDestroy {


  processes: BackgroundProcess[] = [];
  subscription: Subscription;

  constructor(private backgroundProcessesService: BackgroundProcessesService) { }

  ngOnInit() {
    this.subscription = this.backgroundProcessesService.onBackgroundProcess()
      .subscribe(process => {
        this.processes.push(process);
      });
  }

  handleProcessCallback(data: BackgroundProcessCallbackData) {

  }


  removeProcess(process: BackgroundProcess) {
    // remove specified alert from array
    this.processes = this.processes.filter(x => x !== process);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }


}
