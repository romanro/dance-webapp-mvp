import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BackgroundProcess } from '@core/models';
import { BackgroundProcessesService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-background-processes',
  templateUrl: './background-processes.component.html'
})
export class BackgroundProcessesComponent implements OnInit, OnDestroy {

  @Input() id: string;

  processes: BackgroundProcess[] = [];
  subscription: Subscription;

  constructor(private backgroundProcessesService: BackgroundProcessesService) { }

  ngOnInit() {
    this.subscription = this.backgroundProcessesService.onBackgroundProcess(this.id)
      .subscribe(process => {
        this.processes.push(process);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }


}
