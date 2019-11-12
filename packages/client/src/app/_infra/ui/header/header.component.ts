import { Component, Input, OnInit } from '@angular/core';
import { MenuData, MenuItemFunction } from '@core/models/';
import { LoginService } from '@core/services/';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutDanskillModalComponent } from '@ui/about-danskill-modal/about-danskill-modal.component';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  @Input() menuData: MenuData;

  menuIsOpen = false;

  constructor(private loginService: LoginService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }

  closeMenu() {
    this.menuIsOpen = false;
  }

  menuItemFunction(fType: MenuItemFunction) {
    switch (fType) {
      case MenuItemFunction.about:
        const modalRef = this.modalService.open(AboutDanskillModalComponent);
        break;
      case MenuItemFunction.logout:
        this.loginService.logout();
        break;
    }
  }

}
