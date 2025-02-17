import { registerPlugin } from '@capacitor/core';

export interface CameraPlugin {
  takePhoto(): Promise<{ filePath: string }>;
  getPhotos(): Promise<{ photos: string[] }>;
}

const Camera = registerPlugin<CameraPlugin>('Camera', {
  web: () => import('./web').then(m => new m.CameraWeb()),
});

export { Camera };
