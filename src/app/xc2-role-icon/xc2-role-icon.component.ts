import { Component, OnInit, Input } from '@angular/core';
import { RoleId } from '../model';

@Component({
  selector: 'xc2-role-icon',
  templateUrl: './xc2-role-icon.component.html',
  styleUrls: ['./xc2-role-icon.component.scss']
})
export class Xc2RoleIconComponent implements OnInit {

  @Input() public role: RoleId;

  constructor() { }

  ngOnInit() {
  }

  public getClass(): any {
    return {
      'role-atk': this.role === 'ATK',
      'ra-sword': this.role === 'ATK',
      'role-hlr': this.role === 'HLR',
      'ra-health': this.role === 'HLR',
      'role-tnk': this.role === 'TNK',
      'ra-shield': this.role === 'TNK',
    }
  }
}
