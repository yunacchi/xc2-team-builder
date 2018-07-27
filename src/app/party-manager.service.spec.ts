import { TestBed, inject } from '@angular/core/testing';

import { PartyManagerService } from './party-manager.service';

describe('PartyManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartyManagerService]
    });
  });

  it('should be created', inject([PartyManagerService], (service: PartyManagerService) => {
    expect(service).toBeTruthy();
  }));
});
