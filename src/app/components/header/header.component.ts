import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public selectedLanguage = 'en';

  constructor(private translate: TranslateService) {}

  public selectLanguage(selection: string) {
    this.translate.use(selection);
    this.selectedLanguage = selection;
  }

  ngOnInit(): void {}
}
