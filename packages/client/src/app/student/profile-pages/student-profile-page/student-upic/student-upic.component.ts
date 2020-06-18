import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertService } from '@app/_infra/core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'dsapp-student-upic',
  templateUrl: './student-upic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentUpicComponent implements OnInit {

  @Input() picBase64: string = null;
  @Output() picChange = new EventEmitter();

  @ViewChild('editorModal', { static: true }) editorModal;
  showAction = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private sanitizer: DomSanitizer, private modalService: NgbModal, private alertService: AlertService) { }

  ngOnInit(): void {
    this.showAction = this.picChange.observers.length > 0;
  }

  openEditor(content) {
    this.modalService.open(content, { size: 'sm', ariaLabelledBy: 'edit-modal-title' }).result.then((result) => {
      // console.log(result);
    });
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    this.alertService.error('USER.ERRORS.loadImageError');
  }

  saveNewPicture() {
    this.picBase64 = this.croppedImage;
    this.picIsChanged(this.picBase64);
    this.modalService.dismissAll();
  }

  cancel() {
    this.croppedImage = '';
    this.modalService.dismissAll();
  }

  sanitizePic(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.picBase64);
  }

  onPicChangeClick($event): void {
    $event.preventDefault();
    this.openEditor(this.editorModal);

  }

  picIsChanged(picBase64: string): void {
    this.picChange.emit(picBase64);
  }

}
