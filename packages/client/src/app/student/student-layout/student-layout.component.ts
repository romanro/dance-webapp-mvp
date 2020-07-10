import { Component, HostListener, OnInit } from '@angular/core';
import { MenuData, MenuItemFunction, NavButton } from '@core/models/';

@Component({
  selector: 'dsapp-student-layout',
  templateUrl: './student-layout.component.html'
})
export class StudentLayoutComponent implements OnInit {
  studentMenuData: MenuData = {
    notificationBtn: { routerLink: '/student/notifications' },
    menuItemsGroups: [
      {
        menuItems: [
          { label: 'COMMON.Profile', routerLink: '/student/profile' }
        ],
        hasSeparator: true
      },
      {
        menuItems: [
          { label: 'COMMON.About', function: MenuItemFunction.about }
        ],
        hasSeparator: true
      },
      {
        menuItems: [
          { label: 'LOGIN.Logout', function: MenuItemFunction.logout }
        ],
        hasSeparator: false
      }
    ]
  };

  studentNavButtons: NavButton[] = [
    { label: 'STUDENT.NAV.Stars', routerLink: '/student/star' },
    { label: 'STUDENT.NAV.MyLab', routerLink: '/student/lab' },
    { label: 'STUDENT.NAV.Practices', routerLink: '/student/practices' }
  ];


  constructor() { }

  ngOnInit() { }
}
