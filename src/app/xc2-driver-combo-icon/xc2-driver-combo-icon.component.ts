import { Component, OnInit, Input } from '@angular/core';
import { DriverComboId } from '../model';

@Component({
  selector: 'xc2-driver-combo-icon',
  templateUrl: './xc2-driver-combo-icon.component.html',
  styleUrls: ['./xc2-driver-combo-icon.component.scss']
})
export class Xc2DriverComboIconComponent implements OnInit {

  @Input() driverCombo: DriverComboId;

  constructor() { }

  ngOnInit() {
  }

  public getClass(): any {
    return {
      'ra': this.driverCombo === 'BREAK',
      'fas': this.driverCombo === 'TOPPLE'
        || this.driverCombo === 'LAUNCH'
        || this.driverCombo === 'SMASH',

      'driver-combo-break': this.driverCombo === 'BREAK',
      'ra-broken-shield': this.driverCombo === 'BREAK',

      'driver-combo-topple': this.driverCombo === 'TOPPLE',
      'fa-undo-alt': this.driverCombo === 'TOPPLE',
      'fa-rotate-270': this.driverCombo === 'TOPPLE',
      
      'driver-combo-launch': this.driverCombo === 'LAUNCH',
      'fa-arrow-up': this.driverCombo === 'LAUNCH',

      'driver-combo-smash': this.driverCombo === 'SMASH',
      'fa-arrow-down': this.driverCombo === 'SMASH',
    }
  }

}
