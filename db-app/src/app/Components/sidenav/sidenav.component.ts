import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/Services/Utility/sidenav.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) public sidenav;
  MatSidenav;

  constructor(private sidenavService: SidenavService, 
    public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
