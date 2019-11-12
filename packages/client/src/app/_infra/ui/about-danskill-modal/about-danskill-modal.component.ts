import { Component, OnInit } from '@angular/core';
import { Configuration } from '@app/_infra/core/models';
import { ConfigurationService } from '@core/services/configuration.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ui-about-danskill-modal',
  templateUrl: './about-danskill-modal.component.html',
  styles: []
})
export class AboutDanskillModalComponent implements OnInit {
  majorVersion: number;
  minorVersion: number;
  buildVersion: number;

  version = '';

  constructor(public activeModal: NgbActiveModal, protected configService: ConfigurationService) {
    const config: Configuration = configService.getConfiguration();
    if (config) {
      this.majorVersion = config.majorVersion;
      this.minorVersion = config.minorVersion;
      this.buildVersion = config.buildVersion;
      this.version = `${this.majorVersion}.${this.minorVersion}.${this.buildVersion}`;
    }

  }

  ngOnInit() {
  }

}
