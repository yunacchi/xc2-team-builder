import { Component, OnInit, OnDestroy } from '@angular/core';
import { PartyManagerService, PartyMemberDescriptor, EffectivePartyMember, EffectiveParty } from '../party-manager.service';
import { BladeManagerService } from '../blade-manager.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Blade, Driver } from '../model';

@Component({
  selector: 'app-my-party-page',
  templateUrl: './my-party-page.component.html',
  styleUrls: ['./my-party-page.component.scss']
})
export class MyPartyPageComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();
  private defaultParty: PartyMemberDescriptor[] = [];
  private blades: Blade[] = [];
  private drivers: Driver[] = [];

  constructor(
    private partyManager: PartyManagerService,
    private bladeManager: BladeManagerService,
  ) { }

  public ngOnInit() {
    this.partyManager.defaultParty$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((p) => {
      this.defaultParty = p;
      const effectiveParty = this.partyManager.buildEffectiveParty(p);
    });

    this.bladeManager.allBlades$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((b) => {
      this.blades = b;
    });

    this.bladeManager.allDrivers$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((d) => {
      this.drivers = d;
    });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
