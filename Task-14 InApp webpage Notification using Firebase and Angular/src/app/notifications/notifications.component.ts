import { Component, OnInit, OnDestroy } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  faBell = faBell;
  showNotificationBar: boolean = false;
  private notificationSubscription!: Subscription;
  notifications: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    let canUpdateCount = false
    this.notificationSubscription = this.notificationService.subscribeToNotifications().subscribe((data: any) => {
    
    this.notifications = (data['Web Notification'].map((item:any)=> Object.entries(item)[0])).reverse();
    
    console.log("data", this.notifications);

      // Update the notification count
      if (canUpdateCount)
        this.notificationService.increaseNotificationCount();
      canUpdateCount = true
    });
  }
  
  ngOnDestroy() {
    // Unsubscribe from the subscription to avoid memory leaks
    this.notificationSubscription.unsubscribe();
  }

  getNotificationCount() {
    return this.notificationService.getNotificationCount();
  }

  toggleNotificationBar() {
    this.showNotificationBar = !this.showNotificationBar;
    // If the notification bar is shown, clear the notification count
    if (this.showNotificationBar) {
      this.notificationService.clearNotifications();
    }
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

  isImageURL(url: string): boolean {
    return url.includes('https://') || url.includes('jpg') || url.includes('jpeg') || url.includes('png') || url.includes('gif');
  }

}
