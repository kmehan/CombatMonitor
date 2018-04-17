import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BleServiceProvider } from '../../providers/ble-service/ble-service';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public    hr1: number = 0;
  public   data: any[];
  public    sp1: number = 0;
  public    sp1max: number = 0;
  public    hr1max: number = 0;
  public task: any;
  public status1: boolean = true;
  public status2: boolean = true;
  public buttonShow1: boolean = true;
  public buttonShow2: boolean = true;
  public buttonShow3: boolean = true;
  public buttonShow4: boolean = true;
  public flag: boolean = true;
  public count: number = 0;
  public hrShow: boolean = true;
  public dataReturnedPrev: number[] = [0,0,0,0];

  public dcount: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private bleService: BleServiceProvider) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad HomePage');
    this.task = setInterval(this.refreshData.bind(this),2);

  }
  refreshData() {

    // if(!this.status1)
    // {
    // this.hr1 = Math.round(Math.random() * (100 - 85) + 85);
    // this.sp1 = Math.round(Math.random() * (20 - 5) + 5);
    // }
    // if(!this.status2)
    // {
    // this.hr2 = Math.round(Math.random() * (100 - 85) + 85 + Math.random() * (5 - 1) + 1);
    // this.sp2 = Math.round(Math.random() * (40 - 10) + 10);
    // }
    var dataReturnedString = this.bleService.readData();
    var dataReturned = dataReturnedString.split(",");
    var comma = dataReturnedString.split(",").length - 1;
    if ((comma>3) || ((Math.abs(Number(dataReturned [3]))<60) || (Math.abs(Number(dataReturned [3]))>300)) || (Math.abs(Number(dataReturned [0])) > 16 || Math.abs(Number(dataReturned [2])) > 16 || Math.abs(Number(dataReturned [1])) > 16))
    {
      dataReturned = this.dataReturnedPrev;
      this.flag = false;

    } else
    {
      this.dataReturnedPrev = dataReturned;
      this.flag = true;
    }

    // this.data = dataReturned.split(",");
    // if((Number(this.data[3]) == 0) || (isNaN(Number(this.data[3]))) )
    // {
    //   this.hr1 = "...";
    // }
    // else
    // {
    //   this.hr1 = this.data[3];
    // }
    //Put for loop to find max and then use acc'n on everything
    var x = Math.abs(Number(dataReturned [0]) * 9.81);
    var y = Math.abs(Number(dataReturned [1]) * 9.81);
    var z = Math.abs((Number(dataReturned [2]) -1) * 9.81) - 9.81;
    var heart = Math.abs(Number(dataReturned [3])-130);
    console.log(dataReturned);
    var total;
    if(!isNaN(x) && !isNaN(y) && !isNaN(z))
    {
      total = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
      this.sp1 = Math.round(total);
      if (this.sp1>40 && (this.flag))
      {
        this.count = this.count + 1;
      }
      if(total>this.sp1max)
      {
        this.sp1max = Math.round(total);
      }
    } else
    {
      this.sp1 = this.sp1;
    }
    if (!isNaN(heart))
    {
      if(heart>220)
      {
        heart = 219;
      }
      this.hr1 = Math.round(heart);
      if(heart>this.hr1max)
      {
        this.hr1max = Math.round(heart);
      }
    } else
    {
      this.hr1 = this.hr1;
    }
    // if (total<30 || (isNaN(total)))
    // {
    //   this.sp1 = "...";
    // }
    // else
    // {
    //   this.sp1 = total.toString();
    // }
    // if ((Number(this.sp1)>Number(this.sp1max)) && (this.sp1 != "..."))
    // {
    //   this.sp1max = this.sp1;
    // }

  }
  display()
  {
    if(this.dcount == 1)
    {
      this.status1 = false;
      this.dcount++;
    }
    else if(this.dcount == 2)
    {
      this.status2 = false;
      this.dcount++;
    }
  }



}
