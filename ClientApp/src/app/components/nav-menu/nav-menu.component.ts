import { Component } from '@angular/core';
import { MenuService } from '../../reactive/menu.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {


  isExpanded = false;

  constructor(private menuService: MenuService) {
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

}
