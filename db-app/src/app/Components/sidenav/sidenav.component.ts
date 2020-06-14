import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/Services/Utility/sidenav.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ColorSchemeService } from 'src/app/Services/Utility/color-scheme.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) public sidenav;
  MatSidenav;
  theme;

  constructor(private sidenavService: SidenavService, 
    public auth: AuthenticationService,
    private colorScheme: ColorSchemeService) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.theme = this.colorScheme.theme;
  }
  toggleSidenav() {
    this.sidenavService.toggle();
  }
  toggleTheme() {
    if (this.theme.value == "dark-theme") {
      this.colorScheme.theme.next('light-theme')
    } else if (this.theme.value == "light-theme") {
      this.colorScheme.theme.next('dark-theme')
    }
  }
}
