import { Component } from '@angular/core';

import { AppConstants } from './app.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** menu items */
  menuItems = Object.values(AppConstants);
}
