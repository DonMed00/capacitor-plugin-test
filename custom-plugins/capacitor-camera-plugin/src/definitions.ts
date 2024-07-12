export interface CameraPlugin {
  takePhoto(): Promise<{ filePath: string }>;
  getPhotos(): Promise<{ photos: string[] }>;
}
