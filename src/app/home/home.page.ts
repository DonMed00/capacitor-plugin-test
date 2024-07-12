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
import { ModalController } from '@ionic/angular';
import { PhotoViewerComponent } from '../photo-viewer/photo-viewer.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ModalController],
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
  photos: { filePath: string }[] = [];
  private photosSubscription: Subscription = new Subscription();

  constructor(
    public cameraService: CameraService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.photosSubscription = this.cameraService.photos$.subscribe((photos) => {
      this.photos = photos;
    });
    this.cameraService.loadSaved();
  }

  ngOnDestroy() {
    if (this.photosSubscription) {
      this.photosSubscription.unsubscribe();
    }
  }

  async takePhoto() {
    await this.cameraService.takePhoto();
  }

  async viewPhoto(photo: string) {
    const modal = await this.modalController.create({
      component: PhotoViewerComponent,
      componentProps: { photo },
    });
    return await modal.present();
  }
}
