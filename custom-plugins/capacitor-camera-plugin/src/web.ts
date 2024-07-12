import { WebPlugin } from '@capacitor/core';

import type { CameraPlugin } from './definitions';

export class CameraWeb extends WebPlugin implements CameraPlugin {
  async takePhoto(): Promise<{ filePath: string }> {
    console.log('Taking a photo (web version)');
    return { filePath: 'path/to/photo.jpg' };
  }
  async getPhotos(): Promise<{ photos: string[] }> {
    console.log('Displaying photos (web version)');
    return { photos: [] };
  }
}
