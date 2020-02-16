import { AuthService } from '../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NOMBRE_APP } from '../../../shared/config/config';
import { MenuService } from '../menu.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public nombreApp: string;
  public menuAdmin: boolean;
  menu: Array<any> = [];

  constructor(
    public usuarioService: AuthService,
    private menuService: MenuService
  ) {
    this.nombreApp = NOMBRE_APP;
  }

  ngOnInit() {
    this.menuAdmin = this.usuarioService.isAdmin();
    this.menu = this.menuService.getMenu();
  }

}
