import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ColorSchemeService } from 'src/app/Services/Utility/color-scheme.service';
import { SidenavService } from 'src/app/Services/Utility/sidenav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  themes: string[];

  constructor(
    private sidenavService: SidenavService,
    private theming: ColorSchemeService,
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.themes = this.theming.themes;
  }

  changeTheme(theme: string) {
    this.theming.theme.next(theme);
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
