import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSelect, MatSelectChange} from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Bank, BANKS } from '../demo-data';


@Component({
  selector: 'app-single-selection-example',
  templateUrl: './single-selection-example.component.html',
  styleUrls: ['./single-selection-example.component.scss']
})
export class SingleSelectionExampleComponent implements OnInit, AfterViewInit, OnDestroy {

  /** list of banks */
  protected eventos: Bank[] = BANKS;

  /** control for the selected bank */
  public eventoCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public eventoFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredEventos: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;
  @Output() eventoEmiter = new EventEmitter();

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  Eventos = 'Eventos';


  constructor() { }

  ngOnInit() {
    // set initial selection
    this.eventoCtrl.setValue(this.eventos[10]);

    // load the initial bank list
    this.filteredEventos.next(this.eventos.slice());

    // listen for search field value changes
    this.eventoFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredEventos
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.eventos) {
      return;
    }
    // get the search keyword
    let search = this.eventoFilterCtrl.value;
    if (!search) {
      this.filteredEventos.next(this.eventos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredEventos.next(
      this.eventos.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  cambioEnSeleccion($event: MatSelectChange) {
    this.eventoEmiter.emit({
      value: $event.value.name
    });
  }
}
