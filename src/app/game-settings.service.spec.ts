import { TestBed, inject } from '@angular/core/testing';

import { GameSettingsService } from './game-settings.service';

describe('GameSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameSettingsService]
    });
  });

  it('should be created', inject([GameSettingsService], (service: GameSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
