import { TestBed, inject, async } from '@angular/core/testing';

import { PartyManagerService } from './party-manager.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { GameSettingsService } from './game-settings.service';

describe('PartyManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      providers: [
        PartyManagerService
      ]
    });
  });

  beforeEach(inject([GameSettingsService], (gss: GameSettingsService) => {
    // Reset settings before test
    gss.clearGameSettings();
    gss.clearSiteSettings();
    // All tests are done at NG+ with expansion pass
    gss.setGameChapter(12);
    gss.setExpansionPass(true);
  }));

  it('should be created', inject([PartyManagerService], (service: PartyManagerService) => {
    expect(service).toBeTruthy();
  }));


  describe('Default party generation', () => {

    it('should create a default party with all members during NG+', async(inject([PartyManagerService], (service: PartyManagerService) => {
      service.defaultParty$.pipe(first()).subscribe(dp => {
        expect(dp).toBeDefined();
        expect(dp.length).toBe(5);

        expect(dp[0].driverId).toBe("REX");
        expect(dp[0].inBattle).toBe(true);
        expect(dp[0].bladeIds.length).toBe(1);
        expect(dp[0].bladeIds[0]).toBe("SEIHAI_HOMURA");

        expect(dp[1].driverId).toBe("NIA");
        expect(dp[1].inBattle).toBe(true);
        expect(dp[1].bladeIds.length).toBe(1);
        expect(dp[1].bladeIds[0]).toBe("BYAKKO");

        expect(dp[2].driverId).toBe("TORA");
        expect(dp[2].inBattle).toBe(true);
        expect(dp[2].bladeIds.length).toBe(2);
        expect(dp[2].bladeIds[0]).toBe("HANA_JS");
        expect(dp[2].bladeIds[1]).toBe("HANA_JK");
        // Hana JD (Poppi QT Pi) needs to be found, and does not
        // appear in default blades unless her Blade.isFound is true

        expect(dp[3].driverId).toBe("MELEPH");
        expect(dp[3].inBattle).toBe(false);
        expect(dp[3].bladeIds.length).toBe(1);
        expect(dp[3].bladeIds[0]).toBe("KAGUTSUCHI");

        expect(dp[4].driverId).toBe("ZEKE");
        expect(dp[4].inBattle).toBe(false);
        expect(dp[4].bladeIds.length).toBe(1);
        expect(dp[4].bladeIds[0]).toBe("SAIKA");

      })
    })));

    it('should add Poppi QT Pi on Tora to the default party when found',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.addBlade("HANA_JD", "TORA", "ICE", "TNK");

          service.defaultParty$.pipe(first()).subscribe(dp => {
            expect(dp[2].driverId).toBe("TORA");
            expect(dp[2].bladeIds.length).toBe(3);
            expect(dp[2].bladeIds[0]).toBe("HANA_JS");
            expect(dp[2].bladeIds[1]).toBe("HANA_JK");
            expect(dp[2].bladeIds[2]).toBe("HANA_JD");

          })
        })));


    it('should create a default party with only Rex and Pyra in chapter 1',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(1);

          service.defaultParty$.pipe(first()).subscribe(dp => {
            expect(dp.length).toBe(1);
            expect(dp[0].driverId).toBe("REX");
            expect(dp[0].bladeIds.length).toBe(1);
            expect(dp[0].bladeIds[0]).toBe("SEIHAI_HOMURA");
          })
        })));


    it('should add Nia with Dromarch and Tora with Poppi Alpha to the default party in chapter 2',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(2);

          service.defaultParty$.pipe(first()).subscribe(dp => {
            expect(dp.length).toBe(3);

            expect(dp[1].driverId).toBe("NIA");
            expect(dp[1].bladeIds.length).toBe(1);
            expect(dp[1].bladeIds[0]).toBe("BYAKKO");

            expect(dp[2].driverId).toBe("TORA");
            expect(dp[2].bladeIds.length).toBe(1);
            expect(dp[2].bladeIds[0]).toBe("HANA_JS");
          })
        })));


    it('should add Poppi QT and Meleph with Brighid to the default party in chapter 5',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(5);

          service.defaultParty$.pipe(first()).subscribe(dp => {
            expect(dp.length).toBe(4);

            expect(dp[2].driverId).toBe("TORA");
            expect(dp[2].bladeIds.length).toBe(2);
            expect(dp[2].bladeIds[0]).toBe("HANA_JS");
            expect(dp[2].bladeIds[1]).toBe("HANA_JK");

            expect(dp[3].driverId).toBe("MELEPH");
            expect(dp[3].bladeIds.length).toBe(1);
            expect(dp[3].bladeIds[0]).toBe("KAGUTSUCHI");
          })
        })));

    it('should add Zeke with Pandoria to the default party in chapter 6',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(6);

          service.defaultParty$.pipe(first()).subscribe(dp => {
            expect(dp.length).toBe(5);

            expect(dp[4].driverId).toBe("ZEKE");
            expect(dp[4].bladeIds.length).toBe(1);
            expect(dp[4].bladeIds[0]).toBe("SAIKA");
          })
        })));
  })
});
