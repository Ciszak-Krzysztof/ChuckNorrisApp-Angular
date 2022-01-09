import { Component } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ChuckNorrisApp-Angular';

  offlineEvent: Observable<Event> | undefined;
  subscriptions: Subscription[] = [];

  constructor(private notifications: NotificationService) {}

  ngOnInit(): void {
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(
      this.offlineEvent.subscribe((e) => {
        this.notifications.showNotification('You are offline', 'Ok', 'error');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
