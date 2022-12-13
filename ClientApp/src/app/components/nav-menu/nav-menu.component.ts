import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../reactive/login.service';
import { MenuService } from '../../reactive/menu.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  token: string = '';
  isExpanded = false;

  constructor(private menuService: MenuService, private tokenService: TokenService) {
  }
    ngOnInit(): void {
      this.tokenService.getToken.subscribe(option => {
        this.token = option;
      });
    }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  setOptionMenu(option: string) {
    this.menuService.setMenu(option);
  }
  closeConnection() {
    this.tokenService.setToken('');
    this.menuService.setMenu('p');
  }
}
