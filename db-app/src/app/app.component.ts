import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';
import { ColorSchemeService } from './Services/Utility/color-scheme.service';
import { Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'db-app';
  showHead: boolean = false;
  themingSubscription: Subscription;

  constructor(
    private router: Router,
    public auth: AuthenticationService,
    private colorSchemeService: ColorSchemeService,
    private overlayContainer: OverlayContainer) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {

        if (event['url'] === '/login' || event['url'] === '/register') {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }

  @HostBinding('class') public cssClass: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.themingSubscription = this.colorSchemeService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
      this.applyThemeOnOverlays();
    });
  }

  /**
   * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
   */
  private applyThemeOnOverlays() {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.colorSchemeService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.themingSubscription.unsubscribe();
  }
}
