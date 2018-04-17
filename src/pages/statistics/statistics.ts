import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


/**
 * Generated class for the StatisticsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

   @ViewChild('lineCanvas') lineCanvas;
   @ViewChild('lineCanvas2') lineCanvas2;

   lineChart: any;
   lineChart2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

            type: 'line',
            data: {
                labels: ["03/11", "05/11", "10/11", "12/11", "13/11", "15/11", "18/11"],
                datasets: [
                    {
                        label: "Maximum Punch",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [650, 598, 809, 811, 563, 552, 406],
                        spanGaps: false,
                    }
                ]
            }

        });
        this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {

            type: 'line',
            data: {
                labels: ["03/11", "05/11", "10/11", "12/11", "13/11", "15/11", "18/11"],
                datasets: [
                    {
                        label: "Maximum Kick",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [1200, 800, 4000, 600, 3500, 8000, 7000],
                        spanGaps: false,
                    }
                ]
            }

        });
  }


}
