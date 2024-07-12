package com.capacitor.camera;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Base64;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CapacitorPlugin(name = "Camera", requestCodes = { 102 })
public class CameraPlugin extends Plugin {
  private static final int CAMERA_PERMISSION_CODE = 100;
  private static final int CAMERA_REQUEST_CODE = 102;

  private Uri imageUri;
  private PluginCall savedCall;

  @PluginMethod()
  public void takePhoto(PluginCall call) {
    saveCall(call);

    if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED ||
      ContextCompat.checkSelfPermission(getContext(), Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(getActivity(),
        new String[]{Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE},
        CAMERA_PERMISSION_CODE);
    } else {
      openCamera();
    }
  }

  @PluginMethod()
  public void getPhotos(PluginCall call) {
    if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 1);
        call.reject("Permission denied");
        return;
    }

    ContentResolver contentResolver = getContext().getContentResolver();
    Uri uri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
    String[] projection = {MediaStore.Images.Media.DATA};
    Cursor cursor = contentResolver.query(uri, projection, null, null, null);

    if (cursor != null) {
        List<String> photos = new ArrayList<>();
        while (cursor.moveToNext()) {
            String path = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA));
            try {
                File file = new File(path);
                FileInputStream fis = new FileInputStream(file);
                byte[] bytes = new byte[(int) file.length()];
                fis.read(bytes);
                fis.close();
                String base64 = Base64.encodeToString(bytes, Base64.DEFAULT);
                photos.add("data:image/jpeg;base64," + base64);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        cursor.close();

        JSArray jsArray = new JSArray(photos);
        JSObject result = new JSObject();
        result.put("photos", jsArray);
        call.resolve(result);
    } else {
        call.reject("No photos found");
    }
}

  private void openCamera() {
    ContentValues values = new ContentValues();
    values.put(MediaStore.Images.Media.TITLE, "New Picture");
    values.put(MediaStore.Images.Media.DESCRIPTION, "App plugin");
    imageUri = getContext().getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);

    Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
    cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);

    startActivityForResult(savedCall, cameraIntent, CAMERA_REQUEST_CODE);
  }

  private String getPathFromContentUri(Uri contentUri) {
    String filePath = null;
    String[] projection = { MediaStore.Images.Media.DATA };
    ContentResolver resolver = getContext().getContentResolver();

    try (Cursor cursor = resolver.query(contentUri, projection, null, null, null)) {
      if (cursor != null && cursor.moveToFirst()) {
        int columnIndex = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        filePath = cursor.getString(columnIndex);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    if (filePath == null) {
      filePath = contentUri.getPath();
    }

    return filePath;
  }

  @Override
  protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
    super.handleOnActivityResult(requestCode, resultCode, data);
    if (requestCode == CAMERA_REQUEST_CODE) {
      PluginCall savedCall = getSavedCall();
      if (resultCode == Activity.RESULT_OK) {
        JSObject result = new JSObject();
        result.put("filePath", getPathFromContentUri(imageUri));
        savedCall.resolve(result);
      } else {
        savedCall.reject("Camera Error");
      }
    }
  }
}
