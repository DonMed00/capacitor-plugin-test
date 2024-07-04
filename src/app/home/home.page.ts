import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Camera } from 'custom-plugins/capacitor-camera-plugin/src';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  echo() {
    Camera.echo({ value: 'Hello World' }).then((res) => {
      console.log(res);
      alert(res.value)
    });
  }
}
