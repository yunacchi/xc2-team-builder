import { Component, OnInit, Input } from '@angular/core';
import { Blade } from '../model';

@Component({
  selector: 'app-blade-thumbnail',
  templateUrl: './blade-thumbnail.component.html',
  styleUrls: ['./blade-thumbnail.component.scss']
})
export class BladeThumbnailComponent implements OnInit {

  @Input() public blade: Blade;
  @Input() public showDriver: boolean;
  @Input() public showElement: boolean;
  @Input() public showRole: boolean;

  constructor() { }

  ngOnInit() {
  }

  public onDragStart() {
    return false;
  }
}
