import { Component } from '@angular/core';
import { TranslateService } from '../../node_modules/@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService)
  {
    translate.setDefaultLang('fr');
  }
}
