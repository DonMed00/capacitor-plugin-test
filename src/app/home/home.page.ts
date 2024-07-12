import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from '@ionic/angular/standalone';
import { CameraService } from '../core/services/camera.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    CommonModule,
  ],
})
export class HomePage {
  photos: string[] = [];
  private photosSubscription: Subscription = new Subscription();
  expandedPhoto: string | null = null;

  constructor(public cameraService: CameraService) {}

  ngOnInit() {
    this.cameraService.loadPhotos();
    this.photosSubscription = this.cameraService.photos$.subscribe((photos) => {
      this.photos = photos;
    });
  }

  ngOnDestroy() {
    if (this.photosSubscription) {
      this.photosSubscription.unsubscribe();
    }
  }

  async takePhoto() {
    await this.cameraService.takePhoto();
  }

  toggleExpanded(photo?: string) {
    if (photo) {
      this.expandedPhoto = photo;
    } else {
      this.expandedPhoto = null;
    }
  }
}
