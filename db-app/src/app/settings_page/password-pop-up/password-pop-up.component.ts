import { Component, OnInit, Input } from '@angular/core';
import { openCloseAnimation, openCloseShadeAnimation } from './animations';

@Component({
  selector: 'app-password-pop-up',
  templateUrl: './password-pop-up.component.html',
  styleUrls: ['./password-pop-up.component.css'],
  animations: [
    openCloseAnimation,
    openCloseShadeAnimation,
  ]
})
export class PasswordPopUpComponent implements OnInit {

  @Input() isOpen = false;

  constructor( ) { }

  ngOnInit(): void { }
}
