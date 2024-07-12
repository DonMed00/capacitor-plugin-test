# Capacitor Plugin - Camera
Steps to use the plugin:
1) Run ' npm install .\custom-plugins\capacitor-camera-plugin '
2) Add android permissions to the manifest : <uses-permission android:name="android.permission.CAMERA"/>
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

3) Check that it works fine.


## In app:
Once the app is active, click on 'Camera' button. The first time, you must accept the required permissions.
After that, you can take a photo and interact with it in the app.
Video example: 
[test app video.webm](https://github.com/user-attachments/assets/260e59a5-6785-4c70-8d06-c6a5c7bc74d0)



## Tech details:
The Camera Plugin provides functionality to capture photos using the device's camera within a Capacitor-based application on Android.
Capacitor Integration: Integrated as a Capacitor plugin (@CapacitorPlugin) with defined request codes (102 for camera operations).

Plugin Methods:
- takePhoto(): Initiates the process to capture a photo, requesting permissions if necessary, and opening the camera.
- getPhotos(): This method retrieves photos from the device's external storage, converts them to base64 format, and returns them as an array of strings representing image data URIs.
