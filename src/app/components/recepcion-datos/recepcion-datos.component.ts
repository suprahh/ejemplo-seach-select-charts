import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-recepcion-datos',
  templateUrl: './recepcion-datos.component.html',
  styleUrls: ['./recepcion-datos.component.scss']
})
export class RecepcionDatosComponent implements OnInit {
  @Input() evento: string;

  constructor() { }

  ngOnInit() {
  }

}
