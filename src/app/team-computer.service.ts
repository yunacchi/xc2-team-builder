import { Injectable } from '@angular/core';
import { BladeManagerService } from './blade-manager.service';
import { Blade, Driver, ElementId, DriverComboId, DriverCharaId } from './model';
import { GameSettingsService, GameSettings } from './game-settings.service';

// Courtesy of https://gist.github.com/axelpale/3118596 .
// MIT license. Adapted for TypeScript.
function computeKCombinations<T>(set: T[], k: number): T[][] {
  if (k > set.length || k <= 0) {
    return []
  }
  if (k === set.length) {
    return [set]
  }
  const combs: T[][] = [];
  if (k === 1) {
    for (let i = 0; i < set.length; i++) {
      combs.push([set[i]])
    }
    return combs
  }
  for (let i = 0; i < set.length - k + 1; i++) {
    const head = set.slice(i, i + 1)
    const tailcombs = computeKCombinations(set.slice(i + 1), k - 1)
    for (let j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]))
    }
  }
  return combs
}

// Courtesy of https://gist.github.com/axelpale/3118596 .
// MIT license. Adapted for TypeScript.
function computeCombinations<T>(set: T[]): T[][] {
  const combs: T[][] = [];
  for (let k = 1; k <= set.length; k++) {
    const k_combs = computeKCombinations(set, k)
    for (let i = 0; i < k_combs.length; i++) {
      combs.push(k_combs[i])
    }
  }
  return combs
}

function reorderAndDistinct<T>(sets: T[][]): T[][] {
  const newSets: T[][] = [];
  sets.forEach(s => {
    s = s.sort();

    if (!newSets.some(ns => {
      return ns.length === s.length
        && ns.every((v, i) => s[i] === v)
    })) {
      newSets.push(s);
    }
  })
  return newSets;
}

@Injectable({
  providedIn: 'root'
})
export class TeamComputerService {

  private blades: Blade[] = [];
  private drivers: Driver[] = [];
  private gameSettings: GameSettings = undefined;

  constructor(
    private bladeManagerService: BladeManagerService,
    private gameSettingsService: GameSettingsService
  ) {
    bladeManagerService.blades$.subscribe(b => this.blades = b);
    bladeManagerService.drivers$.subscribe(d => this.drivers = d);
    gameSettingsService.gameSettings$.subscribe(s => this.gameSettings = s)
  }

  public permuteStuff() {
    // Hold on! This is going to get a bit wild.
    // Also, this is brute-forcing.
    // We could be smarter! We're not.
    // Look! A bird lady! I want to ride that bird lady.

    // First off: create driver and blade arrays and maps!
    // Note that we're going to use blades by their album number
    // instead of their ID string like we do in the rest of the app.
    const drivers = this.drivers.filter(x => !x.isHidden);
    const blades = this.blades.filter(x => !x.isHidden);
    const bladeMap: { [albumNumber: number]: Blade } = {};
    blades.forEach(b => bladeMap[b.db.albumNumber] = b);

    // This will contain the blade combinations per driver.
    const bladeCombinations: { [driverId: string]: number[][] } = {};
    // And this will contain the combinations of drivers.
    let driverCombinations: Driver[][];

    // Compute all possible driver combinations.
    // You can do this in your head, but we can also ask your computer to do it for us!
    // Spoiler: There are 10.
    // Rex/Nia/Tora
    // Rex/Nia/Morag
    // Rex/Nia/Zeke
    // Rex/Tora/Morag
    // Rex/Tora/Zeke
    // Rex/Morag/Zeke
    // Nia/Tora/Morag
    // Nia/Tora/Zeke
    // Nia/Morag/Zeke
    // Tora/Morag/Zeke
    if (drivers.length > 3) {
      driverCombinations = computeKCombinations(drivers, 3);
    } else {
      driverCombinations = [drivers];
    }
    console.log(driverCombinations);

    // Memorize special IDs for later.
    const niaAlbumNumber = blades.find(x => x.id === 'NIA').db.albumNumber;
    const byakkoAlbumNumber = blades.find(x => x.id === 'BYAKKO').db.albumNumber;
    const homuraAlbumNumber = blades.find(x => x.id === 'SEIHAI_HOMURA').db.albumNumber;
    const hikariAlbumNumber = blades.find(x => x.id === 'SEIHAI_HIKARI').db.albumNumber;

    // Now: Compute all possible combination of engaged blades
    // for all the drivers.
    // Constraint: Up to three Blades per driver at the same time.
    // (Except Rex, that CHEATER, having two blades plus anywhere betwee
    // one to three girls, plus possibly a catgirl, at any given time)
    // Order is not important here.
    // Rex's Master Driver mode will be taken care of later.
    drivers.forEach(d => {
      const bladeNumbers = d.boundBlades
        // Remove hidden blades
        // Remove Mythra from combinations: she always comes with Pyra anyway)
        .filter(x => !x.isHidden && x.id !== 'SEIHAI_HIKARI')
        .map(x => x.db.albumNumber);

      let combinations: number[][];

      if (bladeNumbers.length <= 3) {
        // No more than a full team?
        // ...Well, there is really only one combination. :(
        combinations = [bladeNumbers];
      } else {
        combinations = computeKCombinations(bladeNumbers, 3);
      }
      bladeCombinations[d.id] = combinations;
      console.log(`${d.id}: ${combinations.length} possible blade combinations!`);
    });

    // Now - speaking about Rex' Master Driver mode:
    // Rex is Master Driver from chapter 8 onwards.
    if (this.gameSettings.c >= 8) {
      // And he can engage Nia. And all you guys!
      // But he still can't engage Poppi (she really, *really* wants that Nopon).
      const bladeNumbers = this.blades
        // Remove hidden blades
        // Remove Mythra from combinations: she always comes with Pyra anyway)
        // Remove Poppi
        .filter(x => !x.isHidden
          && x.id !== 'SEIHAI_HIKARI'
          && x.id !== 'HANA_JS'
          && x.id !== 'HANA_JK'
          && x.id !== 'HANA_JD'
          && x.id !== 'HANABUSTER'
        )
        .map(x => x.db.albumNumber);

      let combinations: number[][];

      if (bladeNumbers.length <= 3) {
        // No more than a full team?
        // Okay, this is bullshit (and impossible at this stage in the game).
        // But I'll allow it!
        combinations = [bladeNumbers];
      } else {
        combinations = computeKCombinations(bladeNumbers, 3);
      }
      bladeCombinations['REX'] = combinations;
      console.log(`REX (Master Driver): ${combinations.length} possible blade combinations!`);
    }

    // All right. We have all possible blade engagement combinations
    // for all possible drivers.

    // The lead Character Blade (Pyra/Mythra, Dromarch, Brighid, Pandoria)
    // cannot be disengaged UNLESS you're on New Game +.
    // We can remove all combinations that don't have them.
    if (this.gameSettings.c < 12) {
      for (let driverId in bladeCombinations) {
        let bladeId: string = undefined;
        // Tora is not affected (he can't be taken in battle without Poppi anyway)
        switch (driverId) {
          case 'REX': bladeId = 'SEIHAI_HOMURA'; break;
          case 'NIA': bladeId = 'BYAKKO'; break;
          case 'MELEPH': bladeId = 'KAGUTSUCHI'; break;
          case 'ZEKE': bladeId = 'SAIKA'; break;
        }
        if (bladeId !== undefined) {
          const bladeNumber: number = blades.find(b => b.id === bladeId).db.albumNumber;
          bladeCombinations[driverId] = bladeCombinations[driverId]
            .filter(combination => combination.indexOf(bladeNumber) >= 0);
        }
      }
    }

    // We can now compute entire party combinations!
    // With crazy constraints like:
    // You can't use Nia as a Blade if she's a Driver!
    // You can't use Nia as a Driver if she's a Blade!
    // You can't use Byakko on Rex unless you're on New Game+ OR Nia is in her Blade form!
    // You can't use a Blade on Rex if it's out on another character in the *same party*!

    // I mentioned brute forcing earlier? Here it is.
    // Complexity is O(d^b^n^Look! That bird lady again!)
    const testParty: (partyCombination: number[][], niaIdx: number) => boolean = (partyCombination, niaIdx) => {

      const allBladeNumbers: number[] = [];

      for (let i = 0; i < partyCombination.length; i++) {
        const driverBlades = partyCombination[i];
        for (let j = 0; j < driverBlades.length; j++) {
          const bladeAlbumNumber: number = driverBlades[j];
          if (allBladeNumbers.indexOf(bladeAlbumNumber) >= 0) {
            // Blade was already engaged!
            return false;
          } else if (niaIdx >= 0 && bladeAlbumNumber === niaAlbumNumber) {
            // Trying to put Blade Nia in party when Driver Nia is in use!
            return false;
          } else if (
            this.gameSettings.c < 12
            && bladeAlbumNumber === byakkoAlbumNumber
            && niaIdx >= 0
            && i !== niaIdx
          ) {
            // Trying to put Dromarch on another character than Nia
            // When Driver Nia is in the party!
            // (Does not apply to NG+)
            return false;
          }
        }
      }
      return true;
    };
    const rateParty = (driverIds: DriverCharaId[], engagedBladeSets: number[][]) => {
      // Would you like some Blades with those numbers?
      let b: Blade;
      let partyBlades: Blade[][] = [];
      let allBlades: Blade[] = [];
      let allElements: ElementId[] = [];
      let allDriverCombos: DriverComboId[] = [];
      let score: number = 0;
      for (let i = 0; i < engagedBladeSets.length; i++) {
        partyBlades[i] = [];
        for (let j = 0; j < engagedBladeSets[i].length; j++) {
          b = blades[engagedBladeSets[i][j]];
          blades[i][j] = b;
          allBlades.push(b);
          if (allElements.indexOf(b.element) < 0) {
            allElements.push(b.element);
          }
          let driverCombos = b.weaponClass.driverCombos[driverIds[i]];
          if (Array.isArray(driverCombos)) {
            for (let k = 0; k < driverCombos.length; k++) {
              if (allDriverCombos.indexOf(driverCombos[k]) < 0
                && (
                  driverCombos[k] === 'BREAK'
                  || driverCombos[k] === 'TOPPLE'
                  || driverCombos[k] === 'LAUNCH'
                  || driverCombos[k] === 'SMASH'
                )
              ) {
                allDriverCombos.push(driverCombos[k]);
              }
            }
          } else {
            if (allDriverCombos.indexOf(driverCombos) < 0 && (
              driverCombos === 'BREAK'
              || driverCombos === 'TOPPLE'
              || driverCombos === 'LAUNCH'
              || driverCombos === 'SMASH'
            )) {
              allDriverCombos.push(driverCombos);
            }
          }
        }
      }

      if (allElements.length >= 8) {
        score += 200;
      } else {
        score += 10 * allElements.length;
      }

      if (allDriverCombos.length >= 4) {
        score += 100;
      } else {
        score += 5 * allElements.length;
      }

      console.log(score);
    }

    const partyCombinations: {
      drivers: Driver[]
      engagedBladeSets: number[][]
    }[] = [];
    let validParties: number = 0;
    let allParties: number = 0;

    let driverCombination: Driver[];
    let driverEngagedBladeSets: number[][][];
    let driverIds: DriverCharaId[];
    let niaIdx: number;
    let driverEngagedBlades: number[][];

    for (let i = 0; i < driverCombinations.length; i++) {
      driverCombination = driverCombinations[i];
      driverIds = drivers.map(d => d.id);
      niaIdx = driverIds.indexOf('NIA');
      driverEngagedBladeSets = drivers.map(d => [...bladeCombinations[d.id]]);
      driverEngagedBlades = [];

      for (let i0 = 0; i0 < driverEngagedBladeSets[0].length; i0++) {
        for (let i1 = 0; i1 < driverEngagedBladeSets[1].length; i1++) {
          for (let i2 = 0; i2 < driverEngagedBladeSets[2].length; i2++) {
            driverEngagedBlades[0] = driverEngagedBladeSets[0][i0];
            driverEngagedBlades[1] = driverEngagedBladeSets[1][i1];
            driverEngagedBlades[2] = driverEngagedBladeSets[2][i2];
            allParties++;

            // Reinsert Mythra into the fray
            if (driverEngagedBlades[0].indexOf(homuraAlbumNumber) >= 0) {
              driverEngagedBlades[0].push(hikariAlbumNumber);
            }
            if (driverEngagedBlades[1].indexOf(homuraAlbumNumber) >= 0) {
              driverEngagedBlades[1].push(hikariAlbumNumber);
            }
            if (driverEngagedBlades[2].indexOf(homuraAlbumNumber) >= 0) {
              driverEngagedBlades[2].push(hikariAlbumNumber);
            }

            if (testParty(driverEngagedBlades, niaIdx)) {
              validParties++;
              rateParty(driverIds, driverEngagedBlades);
            }
          }
        }
      }
    }
    // driverCombinations.forEach((drivers) => {
    //   const combinationSets = drivers.map(d => [...bladeCombinations[d.id]]);
    //   const driverIds = drivers.map(d => d.id);
    //   combinationSets[0].forEach(driver0blades => {
    //     combinationSets[1].forEach(driver1blades => {
    //       combinationSets[2].forEach(driver2blades => {
    //         const engagedBladeSets = [
    //           driver0blades,
    //           driver1blades,
    //           driver2blades
    //         ];
    //         if(testParty(engagedBladeSets, driverIds)) {
    //           validParties++;
    //           }
    //       });
    //     });
    //   });

    console.log(`${allParties} parties tested!`);
    console.log(`${validParties} parties valid!`);
    console.log(`${partyCombinations.length} party combinations!`);
  }
}
