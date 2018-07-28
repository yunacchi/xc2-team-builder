import { Component, OnInit, Input } from '@angular/core';
import { ElementId } from '../model';

@Component({
  selector: 'xc2-element-icon',
  templateUrl: './xc2-element-icon.component.html',
  styleUrls: ['./xc2-element-icon.component.scss']
})
export class Xc2ElementIconComponent implements OnInit {
  
  @Input() public element: ElementId;

  constructor() { }

  ngOnInit() {
  }

}
