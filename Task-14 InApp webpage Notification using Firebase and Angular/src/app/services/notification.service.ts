import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private notificationCount = 0;
  private notificationCollection = 'notification'; // Replace this with our Firestore collection name
  // private notificationDoc = 'NotificationTest'; // Replace this with our specific document ID
  private notificationDoc = 'InApp Web Notification'; // Replace this with our specific document ID

  constructor(private firestore: AngularFirestore,private http: HttpClient) {}
  
  getNotificationCount() {
    return this.notificationCount;
  }

  increaseNotificationCount() {
    this.notificationCount += 1;
    console.log("notificationCount", this.notificationCount);
  }

  clearNotifications() {
    this.notificationCount = 0;
  }

  // Subscribe to Firebase notifications and update the notification count
  subscribeToNotifications(): Observable<any> {
    return this.firestore.collection(this.notificationCollection).doc(this.notificationDoc).valueChanges();
  }
}
