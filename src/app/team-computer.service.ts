import { Injectable } from '@angular/core';
import { Blade, Driver, ElementId, DriverComboId, DriverCharaId, DriverComboMap, RoleId } from './model';
import { computeKCombinations } from './math.util';



function testParty(
  partyCombination: number[][], niaIdx: number, niaAlbumNumber: number,
  byakkoAlbumNumber: number, chapter: number
): boolean {

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
        chapter < 12
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
}

function rateParty(
  driverIds: DriverCharaId[],
  engagedBladeSets: number[][],
  bladeMap: { [albumNumber: number]: Blade }
): boolean {
  // Would you like some Blades with those numbers?
  let b: Blade;
  const partyBlades: Blade[][] = [];
  const allBlades: Blade[] = [];
  let driverRoles: RoleId[];
  const partyRoles: RoleId[] = [];
  const allElements: ElementId[] = [];
  const allDriverCombos: DriverComboId[] = [];
  // let score = 0;
  let driverCombos: DriverComboId[];

  for (let i = 0; i < engagedBladeSets.length; i++) {
    partyBlades[i] = [];
    driverRoles = [];
    for (let j = 0; j < engagedBladeSets[i].length; j++) {
      b = bladeMap[engagedBladeSets[i][j]];
      allBlades.push(b);

      if (allElements.indexOf(b.element) < 0) {
        allElements.push(b.element);
      }

      if (driverRoles.indexOf(b.role) < 0) {
        driverRoles.push(b.role);
      }

      driverCombos = b.weaponClass.driverCombos[driverIds[i]];
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
    }

    if (driverRoles.length === 1) {
      if (partyRoles.indexOf(driverRoles[0]) < 0) {
        partyRoles.push(driverRoles[0]);
      }
    }
  }

  // All elements? 200 points!
  // if (allElements.length >= 8) {
  //   score += 200;
  // } else {
  //   score += 10 * allElements.length;
  // }
  // All driver combos? 100 points!
  // if (allDriverCombos.length >= 4) {
  //   score += 100;
  // } else {
  //   score += 5 * allElements.length;
  // }

  const hasAllElements = allElements.length >= 8;
  if (hasAllElements) {
    const hasAllDriverCombos = allDriverCombos.length >= 4;
    if (hasAllDriverCombos) {
      const hasAllRoles = partyRoles.length >= 3;

      if (hasAllElements && hasAllDriverCombos && hasAllRoles) {
        console.log('Score!');
        return true;
      }
    }
  }

  return false;
  // console.log(score);
}

export interface TeamComputerOptions {
  disableRexMasterDriver: boolean;
  disableCharacterBladeReassignment: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TeamComputerService {

  public computeTeams(
    bladePool: Blade[],
    driverPool: Driver[],
    currentChapter: number,
    options: TeamComputerOptions
  ) {
    // Hold on! This is going to get a bit wild.
    // Also, this is brute-forcing.
    // We could be smarter! We're not.
    // Look! A bird lady! I want to ride that bird lady.

    // First off: create driver and blade arrays and maps!
    // Note that we're going to use blades by their album number
    // instead of their ID string like we do in the rest of the app.
    const bladeMap: { [albumNumber: number]: Blade } = {};
    const bladeIdMap: { [id: string]: Blade } = {};

    // Memorize special IDs for later.
    let niaAlbumNumber = 0;
    let byakkoAlbumNumber = 0;
    let homuraAlbumNumber = 0;
    let hikariAlbumNumber = 0;
    for (let i = 0; i < bladePool.length; i++) {
      switch (bladePool[i].id) {
        case 'NIA':
          niaAlbumNumber = bladePool[i].db.albumNumber;
          break;
        case 'BYAKKO':
          byakkoAlbumNumber = bladePool[i].db.albumNumber;
          break;
        case 'SEIHAI_HOMURA':
          homuraAlbumNumber = bladePool[i].db.albumNumber;
          break;
        case 'SEIHAI_HIKARI':
          hikariAlbumNumber = bladePool[i].db.albumNumber;
          break;
      }
      bladeMap[bladePool[i].db.albumNumber] = bladePool[i];
      bladeIdMap[bladePool[i].id] = bladePool[i];
    }

    // This will contain the blade combinations per driver.
    const bladeNumberCombinations: { [driverId: string]: number[][] } = {};
    // And this will contain the combinations of drivers.
    let driverIdCombinations: DriverCharaId[][];

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
    if (driverPool.length > 3) {
      driverIdCombinations = computeKCombinations(driverPool.map(x => x.id), 3);
    } else {
      driverIdCombinations = [driverPool.map(x => x.id)];
    }
    console.log(`Using ${driverIdCombinations.length} driver combinations!`);

    // Now: Compute all possible combination of engaged blades
    // for all the drivers.
    // Constraint: Up to three Blades per driver at the same time.
    // (Except Rex, that CHEATER, having two blades plus anywhere betwee
    // one to three girls, plus possibly a catgirl, at any given time)
    // Order is not important here.
    // Rex's Master Driver mode will be taken care of later.
    driverPool.forEach(d => {
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
      bladeNumberCombinations[d.id] = combinations;
      console.log(`${d.id}: ${combinations.length} possible blade combinations!`);
    });

    // Now - speaking about Rex' Master Driver mode:
    // Rex is Master Driver from chapter 8 onwards.
    if (currentChapter >= 8 && !options.disableRexMasterDriver) {
      // And he can engage Nia. And all you guys!
      // But he still can't engage Poppi (she really, *really* wants that Nopon).
      const bladeNumbers = bladePool
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
      bladeNumberCombinations['REX'] = combinations;
      console.log(`REX (Master Driver): ${combinations.length} possible blade combinations!`);
    }

    // All right. We have all possible blade engagement combinations
    // for all possible drivers.

    // The lead Character Blade (Pyra/Mythra, Dromarch, Brighid, Pandoria)
    // cannot be disengaged UNLESS you're on New Game +.
    // We can remove all combinations that don't have them.
    if (currentChapter < 12 && !options.disableCharacterBladeReassignment) {
      for (const driverId in bladeNumberCombinations) {
        if (bladeNumberCombinations.hasOwnProperty(driverId)) {
          let bladeId: string;
          // Tora is not affected (he can't be taken in battle without Poppi anyway)
          switch (driverId) {
            case 'REX': bladeId = 'SEIHAI_HOMURA'; break;
            case 'NIA': bladeId = 'BYAKKO'; break;
            case 'MELEPH': bladeId = 'KAGUTSUCHI'; break;
            case 'ZEKE': bladeId = 'SAIKA'; break;
          }
          if (bladeId !== undefined && bladeIdMap[bladeId]) {
            const bladeNumber: number = bladeIdMap[bladeId].db.albumNumber;
            bladeNumberCombinations[driverId] = bladeNumberCombinations[driverId]
              .filter(combination => combination.indexOf(bladeNumber) >= 0);
          }
        }
      }
    }

    // Remap blade numbers to blades
    const bladeCombinations: { [driverId: string]: number[][] } = {};

    // We can now compute entire party combinations!
    // With crazy constraints like:
    // You can't use Nia as a Blade if she's a Driver!
    // You can't use Nia as a Driver if she's a Blade!
    // You can't use Byakko on Rex unless you're on New Game+ OR Nia is in her Blade form!
    // You can't use a Blade on Rex if it's out on another character in the *same party*!

    // I mentioned brute forcing earlier? Here it is.
    // Complexity is O(d^b^n^Look! That bird lady again!)

    // const partyCombinations: {
    //   drivers: Driver[]
    //   engagedBladeSets: number[][]
    // }[] = [];
    // let allParties = 0;
    // let validParties = 0;
    // let ratedParties = 0;

    // let driverCombination: Driver[];
    // let driverEngagedBladeSets: number[][][];
    // let driverIds: DriverCharaId[];
    // let niaIdx: number;
    // let driverEngagedBladeNumbers: number[][];

    // for (let i = 0; i < driverIdCombinations.length; i++) {
    //   driverCombination = driverIdCombinations[i];
    //   driverIds = driverCombination.map(d => d.id);
    //   console.log(`Testing driver combination ${driverIds.join(', ')}: ${i + 1}/${driverIdCombinations.length}`);
    //   niaIdx = driverIds.indexOf('NIA');
    //   driverEngagedBladeSets = driverCombination.map(d => [...bladeCombinations[d.id]]);
    //   driverEngagedBladeNumbers = [];

    //   const totalCombinations = driverEngagedBladeSets[0].length
    //     * driverEngagedBladeSets[1].length
    //     * driverEngagedBladeSets[2].length;
    //   console.log(`Checking ${totalCombinations} engaged blade combinations`);


    //   for (let i0 = 0; i0 < driverEngagedBladeSets[0].length; i0++) {
    //     for (let i1 = 0; i1 < driverEngagedBladeSets[1].length; i1++) {
    //       for (let i2 = 0; i2 < driverEngagedBladeSets[2].length; i2++) {
    //         driverEngagedBladeNumbers[0] = driverEngagedBladeSets[0][i0];
    //         driverEngagedBladeNumbers[1] = driverEngagedBladeSets[1][i1];
    //         driverEngagedBladeNumbers[2] = driverEngagedBladeSets[2][i2];
    //         allParties++;

    //         // Reinsert Mythra into the fray
    //         if (
    //           driverEngagedBladeNumbers[0].indexOf(homuraAlbumNumber) >= 0
    //           && driverEngagedBladeNumbers[0].indexOf(hikariAlbumNumber) < 0
    //         ) {
    //           driverEngagedBladeNumbers[0].push(hikariAlbumNumber);
    //         }
    //         if (
    //           driverEngagedBladeNumbers[1].indexOf(homuraAlbumNumber) >= 0
    //           && driverEngagedBladeNumbers[1].indexOf(hikariAlbumNumber) < 0) {
    //           driverEngagedBladeNumbers[1].push(hikariAlbumNumber);
    //         }
    //         if (
    //           driverEngagedBladeNumbers[2].indexOf(homuraAlbumNumber) >= 0
    //           && driverEngagedBladeNumbers[2].indexOf(hikariAlbumNumber) < 0
    //         ) {
    //           driverEngagedBladeNumbers[2].push(hikariAlbumNumber);
    //         }

    //         if (testParty(driverEngagedBladeNumbers, niaIdx, niaAlbumNumber, byakkoAlbumNumber, this.gameSettings.c)) {
    //           validParties++;
    //           if (rateParty(driverIds, driverEngagedBladeNumbers, bladeMap)) {
    //             ratedParties++;
    //             partyCombinations.push({
    //               drivers: driverCombination,
    //               engagedBladeSets: driverEngagedBladeNumbers
    //             });
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
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

    // console.log(`${allParties} parties tested!`);
    // console.log(`${validParties} parties valid!`);
    // console.log(`${ratedParties} parties rated!`);
    // console.log(`${partyCombinations.length} party combinations!`);
  }
}
