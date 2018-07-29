import { Component, OnInit, Input } from '@angular/core';
import { Blade } from '../model';

@Component({
  selector: 'app-blade-tooltip-content',
  templateUrl: './blade-tooltip-content.component.html',
  styleUrls: ['./blade-tooltip-content.component.scss']
})
export class BladeTooltipContentComponent implements OnInit {

  @Input() public blade: Blade;

  constructor() { }

  ngOnInit() {
  }

}
