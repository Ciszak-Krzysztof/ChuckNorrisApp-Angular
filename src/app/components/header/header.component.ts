import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public selectedLanguage = 'en';

  constructor(private translate: TranslateService) {}

  public selectLanguage(selection: string): void {
    this.translate.use(selection);
    this.selectedLanguage = selection;
  }
}
