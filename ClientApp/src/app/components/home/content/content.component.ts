import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../reactive/menu.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public op: string | undefined;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenu.subscribe(option => {
      this.op = option;
    });
  }

}
