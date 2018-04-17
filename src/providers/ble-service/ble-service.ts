import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BLE } from '@ionic-native/ble';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the BleServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BleServiceProvider {
  bluefruit : any = {
    serviceUUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    txCharacteristic: '6e400002-b5a3-f393-e0a9-e50e24dcca9e', // transmit is from the phone's perspective
    rxCharacteristic: '6e400003-b5a3-f393-e0a9-e50e24dcca9e'  // receive is from the phone's perspective
  };

  peripheral: any = {};
  statusMessage: string;
  device: any = {};
  parseData: any;
  alert: any;
  connected: boolean = false;

  constructor(public http: Http, private ble: BLE, private ngZone: NgZone, private alertCtrl: AlertController) {

  }
  scan() {
    this.setStatus('Scanning for BioStrike');
    this.showAlert('Status',this.statusMessage);
    //this.devices = [];  // clear list
    this.ble.scan([this.bluefruit.serviceUUID], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );
    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    //this.showAlert('Discovered', JSON.stringify(device, null, 2))
    this.ngZone.run(() => {
      this.device = device;
    });
    this.connect();
  }

  // If location permission is denied, you'll end up here
 scanError(error) {
   this.setStatus('Error ' + error);
   this.showAlert('Unexpected Error', 'Error Scanning for Bluetooth Device')
 }

 setStatus(message) {
  console.log(message);
  this.ngZone.run(() => {
    this.statusMessage = message;
  });
}
  connect() {
   this.setStatus('Connecting to ' + this.device.name || this.device.id);
   // This is not a promise, the device can call disconnect after it connects, so it's an observable
   this.ble.connect(this.device.id).subscribe(
     peripheral => this.onConnected(peripheral),
     peripheral => this.onError()
   );
  }
  onError()
  {
    this.connected = false;
    this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected');
  }
  onConnected(peripheral) {
    this.peripheral = peripheral;
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
    this.connected = true;
    this.alert.dismiss();
    this.showAlert('Connected', "Connected to BioStrike");

    // Subscribe for notifications when the temperature changes
    this.ble.startNotification(this.peripheral.id, this.bluefruit.serviceUUID, this.bluefruit.rxCharacteristic).subscribe(
      data => this.onDataReceived(data),
      () => this.showAlert('Unexpected Error', 'Failed to Set up Data Connection')
    )

    // Read the current value of the temperature characteristic
    this.ble.read(this.peripheral.id, this.bluefruit.serviceUUID, this.bluefruit.rxCharacteristic).then(
      data => this.onDataReceived(data),
      () => console.log('Unexpected Error - Failed to receive data')
    )
  }
  showAlert(title, message) {
    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    this.alert.present();
  }
  onDataReceived(buffer)
  {
    this.parseData =  String.fromCharCode.apply(null, new Uint8Array(buffer));
  }
  readData()
  {
    var res;
    if (typeof this.parseData != 'undefined')
    {
      res = this.parseData;
    } else
    {
      res = "0,0,0,0";
    }
    return res;
  }
  isConnected()
  {
    return this.connected;
  }

}
