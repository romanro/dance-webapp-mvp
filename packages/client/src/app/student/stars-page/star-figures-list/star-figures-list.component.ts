import { Component, Input, OnInit } from '@angular/core';
import { VideoPlayerModalComponent } from '@app/_infra/ui';
import { Figure } from '@core/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dsapp-star-figures-list',
  templateUrl: './star-figures-list.component.html',
  styles: []
})
export class StarFiguresListComponent implements OnInit {

  @Input() figures: Array<Figure> = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  previewFigure(videoUrl, figureName) {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.videoURL = videoUrl;
    modalRef.componentInstance.title = figureName;
    modalRef.componentInstance.autoplay = true;
  }

}
