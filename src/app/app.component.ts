import { Component } from '@angular/core';
import {VERSION} from '@angular/material';

import { MatSelectSearchVersion } from './mat-select-search/ngx-mat-select-search.module';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  version = VERSION;

  matSelectSearchVersion = MatSelectSearchVersion;
  nombre: string;

  obtenerEvento($event: any) {
    this.nombre = $event.value;
  }
}
