import { Injectable } from '@angular/core';
import { Camera } from 'custom-plugins/capacitor-camera-plugin/src';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private photosSubject = new BehaviorSubject<{ filePath: string }[]>([]);
  public photos$ = this.photosSubject.asObservable();

  constructor() {}

  async takePhoto() {
    try {
      const result = await Camera.takePhoto();
      console.log('Photo saved to:', result.filePath);
      this.photosSubject.next([...this.photosSubject.getValue(), result]);
      this.save();
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  loadSaved() {
    const photoList = localStorage.getItem('photos');
    if (photoList) {
      const parsedPhotos = JSON.parse(photoList);
      this.photosSubject.next(parsedPhotos);
    }
    return this.photosSubject.getValue();
  }

  private save() {
    localStorage.setItem(
      'photos',
      JSON.stringify(this.photosSubject.getValue())
    );
  }
}
