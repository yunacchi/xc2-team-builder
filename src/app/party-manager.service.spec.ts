import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { HttpLoaderFactory } from './app.module';
import { GameSettingsService } from './game-settings.service';
import { PartyDescription } from './model';
import { PartyManagerService } from './party-manager.service';


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
    // All tests are done by default at NG+ with expansion pass
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
        expect(dp.partyMembers.length).toBe(5);

        expect(dp.partyMembers[0].driverId).toBe('REX');
        expect(dp.partyMembers[0].inBattle).toBe(true);
        expect(dp.partyMembers[0].bladeIds.length).toBe(1);
        expect(dp.partyMembers[0].bladeIds[0]).toBe('SEIHAI_HOMURA');

        expect(dp.partyMembers[1].driverId).toBe('NIA');
        expect(dp.partyMembers[1].inBattle).toBe(true);
        expect(dp.partyMembers[1].bladeIds.length).toBe(1);
        expect(dp.partyMembers[1].bladeIds[0]).toBe('BYAKKO');

        expect(dp.partyMembers[2].driverId).toBe('TORA');
        expect(dp.partyMembers[2].inBattle).toBe(true);
        expect(dp.partyMembers[2].bladeIds.length).toBe(2);
        expect(dp.partyMembers[2].bladeIds[0]).toBe('HANA_JS');
        expect(dp.partyMembers[2].bladeIds[1]).toBe('HANA_JK');
        // Hana JD (Poppi QT Pi) needs to be found, and does not
        // appear in default blades unless her Blade.isFound is true

        expect(dp.partyMembers[3].driverId).toBe('MELEPH');
        expect(dp.partyMembers[3].inBattle).toBe(false);
        expect(dp.partyMembers[3].bladeIds.length).toBe(1);
        expect(dp.partyMembers[3].bladeIds[0]).toBe('KAGUTSUCHI');

        expect(dp.partyMembers[4].driverId).toBe('ZEKE');
        expect(dp.partyMembers[4].inBattle).toBe(false);
        expect(dp.partyMembers[4].bladeIds.length).toBe(1);
        expect(dp.partyMembers[4].bladeIds[0]).toBe('SAIKA');
      });
    })));

    it('should add Poppi QT Pi on Tora to the default party when found',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.addBlade('HANA_JD', 'TORA', 'ICE', 'TNK');

          service.defaultParty$.pipe(first()).subscribe(dp => {
            expect(dp.partyMembers[2].driverId).toBe('TORA');
            expect(dp.partyMembers[2].bladeIds.length).toBe(3);
            expect(dp.partyMembers[2].bladeIds[0]).toBe('HANA_JS');
            expect(dp.partyMembers[2].bladeIds[1]).toBe('HANA_JK');
            expect(dp.partyMembers[2].bladeIds[2]).toBe('HANA_JD');
          });
        })));


    it('should create a default party with only Rex and Pyra in chapter 1',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(1);

          service.defaultParty$.pipe(first()).subscribe(dp => {
            expect(dp.partyMembers.length).toBe(1);
            expect(dp.partyMembers[0].driverId).toBe('REX');
            expect(dp.partyMembers[0].bladeIds.length).toBe(1);
            expect(dp.partyMembers[0].bladeIds[0]).toBe('SEIHAI_HOMURA');
          });
        })));


    it('should add Nia with Dromarch and Tora with Poppi Alpha to the default party in chapter 2',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(2);

          service.defaultParty$.pipe(first()).subscribe(dp => {
            expect(dp.partyMembers.length).toBe(3);

            expect(dp.partyMembers[1].driverId).toBe('NIA');
            expect(dp.partyMembers[1].bladeIds.length).toBe(1);
            expect(dp.partyMembers[1].bladeIds[0]).toBe('BYAKKO');

            expect(dp.partyMembers[2].driverId).toBe('TORA');
            expect(dp.partyMembers[2].bladeIds.length).toBe(1);
            expect(dp.partyMembers[2].bladeIds[0]).toBe('HANA_JS');
          });
        })));


    it('should add Poppi QT and Meleph with Brighid to the default party in chapter 5',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(5);

          service.defaultParty$.pipe(first()).subscribe(dp => {
            expect(dp.partyMembers.length).toBe(4);

            expect(dp.partyMembers[2].driverId).toBe('TORA');
            expect(dp.partyMembers[2].bladeIds.length).toBe(2);
            expect(dp.partyMembers[2].bladeIds[0]).toBe('HANA_JS');
            expect(dp.partyMembers[2].bladeIds[1]).toBe('HANA_JK');

            expect(dp.partyMembers[3].driverId).toBe('MELEPH');
            expect(dp.partyMembers[3].bladeIds.length).toBe(1);
            expect(dp.partyMembers[3].bladeIds[0]).toBe('KAGUTSUCHI');
          });
        })));

    it('should add Zeke with Pandoria to the default party in chapter 6',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(6);

          service.defaultParty$.pipe(first()).subscribe(dp => {
            expect(dp.partyMembers.length).toBe(5);

            expect(dp.partyMembers[4].driverId).toBe('ZEKE');
            expect(dp.partyMembers[4].bladeIds.length).toBe(1);
            expect(dp.partyMembers[4].bladeIds[0]).toBe('SAIKA');
          });
        })));
  });

  describe('Party processing', () => {
    it('should process the default party correctly',
      async(inject([PartyManagerService],
        (service: PartyManagerService) => {
          service.defaultParty$.pipe(first()).subscribe(dp => {
            /*
            Default battle party has:
            - Rex, with Pyra, and implicit Mythra (ATK, Fire, Light, Topple)
            - Nia, with Dromarch (HLR, Water, Break)
            - Tora, with Poppi Alpha and Poppi QT in their default settings (TNK, Earth, Fire, Topple, Smash)
            */
            const ep = service.buildEffectiveParty(dp);
            expect(ep).toBeDefined();

            expect(ep.partyMembers.length).toBe(5);

            expect(ep.partyMembers[0].driver.id).toBe('REX');
            expect(ep.partyMembers[0].classId).toBe('ATK');
            expect(ep.partyMembers[0].blades.length).toBe(1);
            expect(ep.partyMembers[0].blades[0].id).toBe('SEIHAI_HOMURA');
            expect(ep.partyMembers[0].hiddenBlade).toBeDefined();
            expect(ep.partyMembers[0].hiddenBlade.id).toBe('SEIHAI_HIKARI');
            expect(ep.partyMembers[0].driverCombos.length).toBe(1);
            expect(ep.partyMembers[0].driverCombos[0]).toBe('TOPPLE');
            expect(ep.partyMembers[0].elements.length).toBe(2);
            expect(ep.partyMembers[0].elements).toEqual(['FIRE', 'LIGHT']);
            expect(ep.partyMembers[0].modifiers).toEqual([
              { id: 'STRENGTH', value: 10 },
              { id: 'ETHER', value: 10 },
            ]);

            expect(ep.partyMembers[1].driver.id).toBe('NIA');
            expect(ep.partyMembers[1].classId).toBe('HLR');
            expect(ep.partyMembers[1].blades.length).toBe(1);
            expect(ep.partyMembers[1].blades[0].id).toBe('BYAKKO');
            expect(ep.partyMembers[1].hiddenBlade).toBeUndefined();
            expect(ep.partyMembers[1].driverCombos.length).toBe(1);
            expect(ep.partyMembers[1].driverCombos[0]).toBe('BREAK');
            expect(ep.partyMembers[1].elements.length).toBe(1);
            expect(ep.partyMembers[1].elements).toEqual(['WATER']);
            expect(ep.partyMembers[1].modifiers).toEqual([
              { id: 'ETHER', value: 10 },
            ]);

            expect(ep.partyMembers[2].driver.id).toBe('TORA');
            expect(ep.partyMembers[2].classId).toBe('TNK-TNK');
            expect(ep.partyMembers[2].blades.length).toBe(2);
            expect(ep.partyMembers[2].blades[0].id).toBe('HANA_JS');
            expect(ep.partyMembers[2].blades[1].id).toBe('HANA_JK');
            expect(ep.partyMembers[2].hiddenBlade).toBeUndefined();
            expect(ep.partyMembers[2].driverCombos.length).toBe(2);
            expect(ep.partyMembers[2].driverCombos).toEqual(['TOPPLE', 'SMASH']);
            expect(ep.partyMembers[2].elements.length).toBe(2);
            expect(ep.partyMembers[2].elements).toEqual(['FIRE', 'EARTH']);
            expect(ep.partyMembers[2].modifiers).toEqual([
              // Poppi does not know what modifiers you put on her!
            ]);

            expect(ep.elements.length).toBe(4);
            expect(ep.elements).toEqual(['FIRE', 'WATER', 'EARTH', 'LIGHT']);

            expect(ep.driverCombos.length).toBe(3);
            expect(ep.driverCombos).toEqual(['BREAK', 'TOPPLE', 'SMASH']);
            expect(ep.errors.length).toBe(0);
          });
        })));

    it('does not add implicit Mythra before chapter 4',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(3);
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['SEIHAI_HOMURA']
                }
              ],
              gameChapter: 3,
            };
            const ep = service.buildEffectiveParty(pmda);

            expect(ep.partyMembers.length).toBe(1);
            expect(ep.partyMembers[0].driver.id).toBe('REX');
            expect(ep.partyMembers[0].classId).toBe('ATK');
            expect(ep.partyMembers[0].blades.length).toBe(1);
            expect(ep.partyMembers[0].blades[0].id).toBe('SEIHAI_HOMURA');
            expect(ep.partyMembers[0].hiddenBlade).toBeUndefined();
            expect(ep.partyMembers[0].elements.length).toBe(1);
            expect(ep.partyMembers[0].elements).toEqual(['FIRE']);
            expect(ep.partyMembers[0].modifiers).toEqual([
              { id: 'STRENGTH', value: 10 },
            ]);
          });
        })));

    it('adds implicit Pyra with Mythra on chapter 4',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(4);
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['SEIHAI_HIKARI']
                }
              ],
              gameChapter: 4,
            };
            const ep = service.buildEffectiveParty(pmda);

            expect(ep.partyMembers.length).toBe(1);
            expect(ep.partyMembers[0].driver.id).toBe('REX');
            expect(ep.partyMembers[0].classId).toBe('ATK');
            expect(ep.partyMembers[0].blades.length).toBe(1);
            expect(ep.partyMembers[0].blades[0].id).toBe('SEIHAI_HIKARI');
            expect(ep.partyMembers[0].hiddenBlade).toBeDefined();
            expect(ep.partyMembers[0].hiddenBlade.id).toBe('SEIHAI_HOMURA');
            expect(ep.partyMembers[0].elements.length).toBe(2);
            expect(ep.partyMembers[0].elements).toEqual(['FIRE', 'LIGHT']);
            expect(ep.partyMembers[0].modifiers).toEqual([
              { id: 'ETHER', value: 10 },
              { id: 'STRENGTH', value: 10 },
            ]);
          });
        })));

    it('adds implicit Mythra with Pyra on chapter 4',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(4);
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['SEIHAI_HOMURA']
                }
              ],
              gameChapter: 4,
            };
            const ep = service.buildEffectiveParty(pmda);

            expect(ep.partyMembers.length).toBe(1);
            expect(ep.partyMembers[0].driver.id).toBe('REX');
            expect(ep.partyMembers[0].classId).toBe('ATK');
            expect(ep.partyMembers[0].blades.length).toBe(1);
            expect(ep.partyMembers[0].blades[0].id).toBe('SEIHAI_HOMURA');
            expect(ep.partyMembers[0].hiddenBlade).toBeDefined();
            expect(ep.partyMembers[0].hiddenBlade.id).toBe('SEIHAI_HIKARI');
            expect(ep.partyMembers[0].elements.length).toBe(2);
            expect(ep.partyMembers[0].elements).toEqual(['FIRE', 'LIGHT']);
            expect(ep.partyMembers[0].modifiers).toEqual([
              { id: 'STRENGTH', value: 10 },
              { id: 'ETHER', value: 10 },
            ]);
          });
        })));

    it('adds an error when given multiple welsh catgirls liked by Rex (along with all you guys), in both Driver and Blade form',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['SEIHAI_HIKARI', 'NIA']
                },
                {
                  driverId: 'NIA',
                  inBattle: true,
                  bladeIds: ['BYAKKO']
                },
              ],
              gameChapter: 12,
            };
            const ep = service.buildEffectiveParty(pmda);

            expect(ep.partyMembers.length).toBe(2);
            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.critical-welsh-catgirl-overflow');
          });
        })));

    it('adds an error when the same Blade is engaged multiple times, on different characters',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['BYAKKO']
                },
                {
                  driverId: 'NIA',
                  inBattle: true,
                  bladeIds: ['BYAKKO']
                },
              ],
              gameChapter: 12,
            };
            const ep = service.buildEffectiveParty(pmda);

            expect(ep.partyMembers.length).toBe(2);
            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.blade-engaged-multiple-times');
            expect(ep.errors[0].params).toBeDefined();
            expect(ep.errors[0].params.bladeId).toBe('BYAKKO');
          });
        })));

    it('adds an error when the same Blade is engaged multiple times, on the same character',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['BYAKKO', 'BYAKKO']
                },
              ],
              gameChapter: 12,
            };
            const ep = service.buildEffectiveParty(pmda);

            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.blade-engaged-multiple-times');
            expect(ep.errors[0].params).toBeDefined();
            expect(ep.errors[0].params.bladeId).toBe('BYAKKO');
          });
        })));

    it('adds an error when engaging both Pyra and Mythra, after chapter 4',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['SEIHAI_HOMURA', 'SEIHAI_HIKARI']
                },
              ],
              gameChapter: 12,
            };
            const ep = service.buildEffectiveParty(pmda);

            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.blade-engaged-multiple-times');
            expect(ep.errors[0].params).toBeDefined();
            expect(ep.errors[0].params.bladeId).toBe('SEIHAI_HIKARI');
          });
        })));

    it('adds an error when engaging both Pyra and Mythra, before chapter 4',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(3);
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['SEIHAI_HOMURA', 'SEIHAI_HIKARI']
                },
              ],
              gameChapter: 12,
            };
            const ep = service.buildEffectiveParty(pmda);

            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.blade-engaged-multiple-times');
            expect(ep.errors[0].params).toBeDefined();
            expect(ep.errors[0].params.bladeId).toBe('SEIHAI_HIKARI');
          });
        })));

    it('adds an error when an unknown Blade is given',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['KASUMI'] // She's dead, Jin
                },
              ],
              gameChapter: 12,
            };
            const ep = service.buildEffectiveParty(pmda);
            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.unknown-blade-id');
            expect(ep.errors[0].params).toBeDefined();
            expect(ep.errors[0].params.bladeId).toBe('KASUMI');
          });
        })));

    it('adds an error when an unknown Driver is given',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'LAURA', // She's dead, Jin
                  inBattle: true,
                  bladeIds: ['SHIN']
                },
              ],
              gameChapter: 12,
            };
            const ep = service.buildEffectiveParty(pmda);
            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.unknown-driver-id');
            expect(ep.errors[0].params).toBeDefined();
            expect(ep.errors[0].params.driverId).toBe('LAURA');
          });
        })));

    it('adds an error when too many Drivers are in battle',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['SEIHAI_HOMURA']
                },
                {
                  driverId: 'NIA',
                  inBattle: true,
                  bladeIds: ['BYAKKO']
                },
                {
                  driverId: 'TORA',
                  inBattle: true,
                  bladeIds: ['HANA_JS']
                },
                {
                  driverId: 'MELEPH',
                  inBattle: true,
                  bladeIds: ['KAGUTSUCHI']
                },
              ],
              gameChapter: 12,
            };
            const ep = service.buildEffectiveParty(pmda);
            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.too-many-drivers-in-battle');
            expect(ep.errors[0].params).toBeDefined();
            expect(ep.errors[0].params.driverId).toBe('MELEPH');
          });
        })));

    it('adds an error when engaging too many blades on one character',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['SEIHAI_HOMURA', 'SUZAKU', 'NIA', 'KAGUTSUCHI']
                },
              ],
              gameChapter: 12,
            };
            const ep = service.buildEffectiveParty(pmda);
            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.too-many-blades-engaged-on-character');
            expect(ep.errors[0].params).toBeDefined();
            expect(ep.errors[0].params.bladeId).toBe('KAGUTSUCHI');
          });
        })));

    it('adds an error when party is empty',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
              ],
              gameChapter: 12,
            };
            const ep = service.buildEffectiveParty(pmda);
            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.party-is-empty');
          });
        })));

    it('adds a TIME PARADOX error when using Mythra before chapter 4',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(3);
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['SEIHAI_HIKARI']
                }
              ],
              gameChapter: 3,
            };
            const ep = service.buildEffectiveParty(pmda);
            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.blade-time-paradox');
            expect(ep.errors[0].params).toBeDefined();
            expect(ep.errors[0].params.bladeId).toBe('SEIHAI_HIKARI');
          });
        })));

    it('adds a TIME PARADOX error when using Blade Nia before chapter 8',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(3);
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['NIA']
                }
              ],
              gameChapter: 4,
            };
            const ep = service.buildEffectiveParty(pmda);
            expect(ep.errors.length).toBe(1);
            expect(ep.errors[0].key).toBe('errors.blade-time-paradox');
            expect(ep.errors[0].params).toBeDefined();
            expect(ep.errors[0].params.bladeId).toBe('NIA');
          });
        })));

    it('adds a TIME PARADOX error when using Mòrag before chapter 5',
      async(inject([PartyManagerService, GameSettingsService],
        (service: PartyManagerService, gss: GameSettingsService) => {
          gss.setGameChapter(3);
          service.defaultParty$.pipe(first()).subscribe(dp => {
            const pmda: PartyDescription = {
              partyMembers: [
                {
                  driverId: 'REX',
                  inBattle: true,
                  bladeIds: ['SEIHAI_HOMURA']
                },
                {
                  driverId: 'MELEPH',
                  inBattle: true,
                  bladeIds: ['KAGUTSUCHI']
                }
              ],
              gameChapter: 4,
            };
            const ep = service.buildEffectiveParty(pmda);

            expect(ep.errors).toEqual([
              {
                key: 'errors.driver-time-paradox',
                params: { driverId: 'MELEPH' },
              },
              {
                key: 'errors.blade-time-paradox',
                params: { bladeId: 'KAGUTSUCHI' },
              },
            ]);
          });
        })));
  });
});
