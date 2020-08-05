import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'dsapp-login-layout',
  templateUrl: './login-layout.component.html',
  styles: []
})
export class LoginLayoutComponent implements OnInit {

  isLoginSelected: boolean;
  constructor(private router: Router) {
    this.isLoginSelected = true;
    console.log(this.router.url.split('/')[1])
    if(this.router.url.split('/')[1] === 'register'){
      this.isLoginSelected = false;
    }
  }

  ngOnInit() {

  }
  setSelected(event){
    this.isLoginSelected = !this.isLoginSelected
  }

}
