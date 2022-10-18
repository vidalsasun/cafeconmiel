import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../reactive/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public op: string | undefined;

  constructor(private menuService: MenuService) {
  }
    ngOnInit(): void {
      this.menuService.getMenu.subscribe(option => {
        this.op = option;
      });
    }
}
