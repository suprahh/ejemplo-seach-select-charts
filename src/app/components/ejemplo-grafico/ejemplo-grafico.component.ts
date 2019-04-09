import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-ejemplo-grafico',
  templateUrl: './ejemplo-grafico.component.html',
  styleUrls: ['./ejemplo-grafico.component.css']
})
export class EjemploGraficoComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions = {
    credits: {
      enabled: true,
      href: 'https://www.google.com',
      text: 'Visita Los paneles'
    },
    title: {
      text: 'Entradas de Skus Catalogo'
    },
    yAxis: {
      title: {
        text: 'Skus Entrates'
      }
    },
    xAxis: {
      categories: ['2019-04-08', '2019-04-09', '2019-04-10']
    },
    series: [{
      dataLabels: {
        enabled: true
      },
      borderColor: '#ffffff',
      animation: {
        duration: 2000
      },
      type: 'column',
      name: 'Fotos',
      data: [
        {
          x: 0,
          y: 350,
          name: '2019-04-08'
        },
        {
          x: 1,
          y: 230,
          name: '2019-04-09'
        },
        {
          x: 2,
          y: 860,
          name: '2019-04-10'
        }
      ]
    }]
  };
  constructor() { }

  ngOnInit() {
  }

}
