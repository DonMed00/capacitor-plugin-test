import { Injectable } from '@angular/core';
import { Camera } from 'custom-plugins/capacitor-camera-plugin/src';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private photosSubject = new BehaviorSubject<string[]>([]);
  public photos$ = this.photosSubject.asObservable();

  constructor() {}

  async takePhoto() {
    try {
      const result = await Camera.takePhoto();
      this.loadPhotos();
      console.log('Photo saved to:', result.filePath);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  async loadPhotos() {
    try {
      const result = await Camera.getPhotos();
      this.photosSubject.next(result.photos);
    } catch (error) {
      console.error('Error al cargar las fotos:', error);
    }
  }
}
