import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public contactHref = 'https://github.com/yunacchi/xc2-team-builder/issues';
  public issuesHref = 'https://github.com/yunacchi/xc2-team-builder/issues';
  public repoHref = 'https://github.com/yunacchi/xc2-team-builder';

  constructor() { }

  ngOnInit() {
  }

}
