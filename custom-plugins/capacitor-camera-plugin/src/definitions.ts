export interface CameraPlugin {
  takePhoto(): Promise<{ filePath: string }>;
}
