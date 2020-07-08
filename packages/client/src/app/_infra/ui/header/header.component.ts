import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MenuData, MenuItemFunction } from '@core/models/';
import { LoginService } from '@core/services/';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutDanskillModalComponent } from '@ui/about-danskill-modal/about-danskill-modal.component';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() menuData: MenuData;

  menuIsOpen = false;
  deferredPrompt: any;
  showAddToHomeButton = false;

  constructor(private loginService: LoginService, private modalService: NgbModal) { }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showAddToHomeButton = true;
  }

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

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showAddToHomeButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

}
