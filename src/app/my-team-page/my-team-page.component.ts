import { Component, OnInit } from '@angular/core';
import { TeamComputerService } from '../team-computer.service';

@Component({
  selector: 'app-my-team-page',
  templateUrl: './my-team-page.component.html',
  styleUrls: ['./my-team-page.component.scss']
})
export class MyTeamPageComponent implements OnInit {
  constructor(
    private teamComputerService: TeamComputerService
  ) { }

  ngOnInit() {
  }

  public doStuff() {
    this.teamComputerService.permuteStuff();
  }
}
