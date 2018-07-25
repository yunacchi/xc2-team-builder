export type RoleId = 'ATK' | 'TNK' | 'HLR' | 'HANA';
export type BladeTypeId = 'SEIHAI' | 'CHARA' | 'GACHA' | 'STORY' | 'QUEST';
export type ElementId = 'LIGHT' | 'DARK' | 'WATER' | 'FIRE' | 'ELECTRIC' | 'EARTH' | 'ICE' | 'WIND' | 'HANA';
export type DriverComboId = 'UNKNOWN' | 'N/A' | 'BREAK' | 'TOPPLE' | 'LAUNCH' | 'SMASH';
export type DriverCharaId = 'REX' | 'NIA' | 'TORA' | 'MELEPH' | 'ZEKE';
export type BladeGenderId = 'M' | 'F' | 'N/A';

export type DriverComboMap = {
    [driver in DriverCharaId]: DriverComboId[];
};

// 'HANA' is just a temporary role for Poppi
// while game setings are not applied, so it's not here.
export const roles: RoleId[] = [
    'ATK', 'HLR', 'TNK'
];

// Uses the order from the game's Blade Manager.
// 'HANA' is just a temporary element for Poppi
// while game setings are not applied, so it's not here.
export const elements: ElementId[] = [
    'FIRE',
    'WATER',
    'WIND',
    'EARTH',
    'ELECTRIC',
    'ICE',
    'LIGHT',
    'DARK',
];

// Uses the order from the game's Blade Manager.
export const genders: BladeGenderId[] = [
    'M',
    'F',
    'N/A',
];

export const bladeTypes: BladeTypeId[] = [
    'SEIHAI',
    'CHARA',
    'GACHA',
    'STORY',
    'QUEST',
];

/**
 * Concatenated database store,
 * with all goodies in one package.
 *
 * @export
 * @interface DbStore
 */
export interface DbStore {
    /**
     * ALl weapon classes contained in the database.
     *
     * @type {DbWeaponClass[]}
     * @memberof DbStore
     */
    weapons: DbWeaponClass[];

    /**
     * All Blade characters contained in the database.
     *
     * @type {DbBlade[]}
     * @memberof DbStore
     */
    blades: DbBlade[];

    /**
     * All Driver characters contained in the database.
     *
     * @type {DbDriverChara[]}
     * @memberof DbStore
     */
    drivers: DbDriverChara[];
}

/**
 * Static Blade Weapon Class, as contained in the database.
 *
 * @export
 * @interface DbWeaponClass
 */
export interface DbWeaponClass {
    /**
     * The Weapon Class ID.
     *
     * @type {string}
     * @memberof DbWeaponClass
     */
    id: string;

    /**
     * The Role attributed to this Weapon Class (ATK, HLR or TNK).
     *
     * @type {RoleId}
     * @memberof DbWeaponClass
     */
    role: RoleId;

    /**
     * An object mapping all Driver characters to the Driver Combos
     * they can peform with this Weapon Class;
     *
     * @type {DriverComboMap}
     * @memberof DbWeaponClass
     */
    driverCombos: DriverComboMap;

    /**
     * The sort index, using the sorting of the game's Blade Manager.
     *
     * @type {number}
     * @memberof DbWeaponClass
     */
    sortIdx: number;
}


/**
 * A static Blade, as contained in the database.
 *
 * @export
 * @interface DbBlade
 */
export interface DbBlade {
    /**
     * The in-game album number from the game's Blade Manager
     * (5*(row number-1)+column number)
     *
     * @type {number}
     * @memberof DbBlade
     */
    albumNumber: number;

    /**
     * The blade identifier.
     * Romanization of the Japanese name, simple uppercase ASCII letters and underscores only,
     * no accents.
     * Homura and Hikari have a SEIHAI_ prefix, because they're the goddamn Aegis.
     *
     * @type {string}
     * @memberof DbBlade
     */
    id: string;

    /**
     * The Weapon Class identifier of the weapon this Blade wields.
     * Rare blades use standard weapons (W_) prefix.
     * Most but not all legendary blades use exclusive weapons,
     * which are formatted (WB_<Blade ID>) instead.
     *
     * @type {string}
     * @memberof DbBlade
     */
    weapon: string;

    /**
     * The Element identifier of this blade.
     * If HANA, then it will be overridden by whatever elemental core Poppi has.
     *
     * @type {ElementId}
     * @memberof DbBlade
     */
    element: ElementId;

    /**
     * The exclusive Driver character identifier of this blade.
     * If present, then this blade cannot be reallocated using Override Protocols
     * or otherwise.
     *
     * @type {string}
     * @memberof DbBlade
     */
    exclusiveDriver?: string;

    /**
     * The Type of this blade.
     * If not present, assumed to be GACHA.
     *
     * @example
     * SEIHAI: Aegis! (Pyra, Mythra)
     * CHARA: Character blade! (Dromarch, Poppi alpha/QT, Brighid, Pandoria)
     * GACHA: Lottery blade! Did you get KOS-MOS yet?
     * STORY: Mandatory or mostly-mandatory Blade! (Roc, Nia, Aegaeon)
     * QUEST: Blade from a Core obtained by non-mandatory means! (Includes Poppi QT Pi)
     *
     * @type {BladeTypeId}
     * @memberof DbBlade
     */
    type?: BladeTypeId;

    /**
     * The chapter at which this blade becomes available.
     * If not present, assumed to be 2, like all other Gacha blades.
     *
     * @type {number}
     * @memberof DbBlade
     */
    chapter?: number;

    /**
     * If true, indicates no picture is available for this blade. :(
     *
     * @type {boolean}
     * @memberof DbBlade
     */
    missingImg?: boolean;

    /**
     * Aliases, for search/filtering or spoiler URL purposes. Optional.
     *
     * @type {string[]}
     * @memberof DbBlade
     */
    aliases?: string[];

    /**
     * If true, this blade will be hidden until you shell out enough money
     * to buy the Xenoblade 2 Expansion pass.
     *
     * @type {boolean}
     * @memberof DbBlade
     */
    requiresExpansionPass?: boolean;

    /**
     * Blade gender, as registered in the game's Blade Manager.
     * Wait. Did you just assume Floren's gender?
     *
     * @type {BladeGenderId}
     * @memberof DbBlade
     */
    gender: BladeGenderId;

    /**
     * If true, indicates this blade's bound driver can change
     * all the time without an Overdrive protocol, and without
     * releasing it (eg. Mikhail).
     * Note that these blades can still not be equipped by Tora.
     *
     * Used notably for expansion blades like Poppibuster, Shulk and Fiora.
     *
     * @type {boolean}
     * @memberof DbBlade
     */
    unbound?: boolean;
}

/**
 * Static Driver character, as stored in whetever database.
 *
 * @export
 * @interface DbDriverChara
 */
export interface DbDriverChara {
    /**
     * Driver ID
     *
     * @type {DriverCharaId}
     * @memberof DbDriverChara
     */
    id: DriverCharaId;


    /**
     * Chapter number in which this Driver character
     * becomes available.
     *
     * @type {number}
     * @memberof DbDriverChara
     */
    chapter: number;

    /**
     * The sort index, using the sorting of the game's Blade Manager.
     *
     * @type {number}
     * @memberof DbDriverChara
     */
    sortIdx: number;
}

// Playable drivers are probably not going to change any time soon. They're hardcoded here.
export const driverCharacters: DbDriverChara[] = [
    {
        id: 'REX',
        chapter: 1,
        sortIdx: 0,
    },
    {
        id: 'NIA', // <- This is best girl, by the way.
        chapter: 2,
        sortIdx: 1,
    },
    {
        id: 'TORA',
        chapter: 2,
        sortIdx: 2,
    },
    {
        id: 'MELEPH',
        chapter: 5,
        sortIdx: 3,
    },
    {
        id: 'ZEKE',
        chapter: 6,
        sortIdx: 4,
    },
];


/**
 * Processed Blade, with regards to what blades have been found,
 * who they belong to, and whether they can be shown considering
 * stored game/chapter settings.
 *
 * @export
 * @interface Blade
 */
export interface Blade {

    /**
     * The blade identifier from {@link DbBlade#id}.
     *
     * @see {DbBlade#id}
     * @type {string}
     * @memberof Blade
     */
    id: string;

    /**
     * The static {@link DbBlade} object relevant to this Blade.
     *
     * @type {DbBlade}
     * @memberof Blade
     */
    db: DbBlade;

    /**
     * The role identifier of this Blade, with regards to game settings
     * in the case of Poppi.
     *
     * @type {RoleId}
     * @memberof Blade
     */
    role: RoleId;

    /**
     * The element identifier of this Blade, with regards to game settings
     * in the case of Poppi.
     *
     * @type {ElementId}
     * @memberof Blade
     */
    element: ElementId;

    /**
     * The type of this Blade from {@link DbBlade#type}.
     *
     * @type {BladeTypeId}
     * @memberof Blade
     */
    bladeType: BladeTypeId;


    /**
     * The chapter at which this blade becomes available, from {@link DbBlade#chapter}.
     *
     * @type {number}
     * @memberof Blade
     */
    minChapter: number;

    /**
     * The exclusive Driver character of this Blade, from {@link DbBlade#exclusiveDriver}.
     *
     * @type {DriverCharaId}
     * @memberof Blade
     */
    exclusiveDriver?: DriverCharaId;

    /**
     * The Weapon Class object linked to this blade.
     *
     * @type {DbWeaponClass}
     * @memberof Blade
     */
    weaponClass: DbWeaponClass;

    /**
     * The diamond portrait thumbnail URL to display with the Blade.
     *
     * @type {string}
     * @memberof Blade
     */
    thumbUrl: string;

    /**
     * True if using this Blade requires the Xenoblade 2 Expansion Pass.
     *
     * @type {boolean}
     * @memberof Blade
     */
    requiresExpansionPass: boolean;

    /**
     * True if this Blade's bound Driver can be changed with an Override Protocol.
     *
     * @type {boolean}
     * @memberof Blade
     */
    canChangeBoundDriver: boolean;

    /**
     * True if this Blade is hidden from lists due to chapter or Expansion Pass
     * constraints.
     *
     * @type {boolean}
     * @memberof Blade
     */
    isHidden: boolean;

    /**
     * True if this Blade was found, bound to a Driver, and can be Engaged.
     *
     * @type {boolean}
     * @memberof Blade
     */
    isFound: boolean;

    /**
     * Blade name aliases, from {@link DbBlade#aliases}
     *
     * @type {string[]}
     * @memberof Blade
     */
    aliases: string[];

    /**
     * The identifier of the bound Driver character.
     * Undefined if not found.
     * In case of a story or character blade, it's the exclusiveDriver property.
     *
     * @type {DriverCharaId}
     * @memberof Blade
     */
    boundDriver?: Driver;

    /**
     * The available driver combos of this blade, for its bound Driver.
     *
     * @type {DriverComboId[]}
     * @memberof Blade
     */
    driverCombos?: DriverComboId[];
}

/**
 * Processed Driver, with regards to what Blades they're bound to, what Blades they can engage,
 * and whether they can be shown considering chapter settings.
 *
 * @export
 * @interface Driver
 */
export interface Driver {
    /**
     * The Driver character identifier.
     *
     * @type {DriverCharaId}
     * @memberof Driver
     */
    id: DriverCharaId;

    /**
     * The static {@link DbDriverChara} object relevant to this Driver.
     *
     * @type {DbDriverChara}
     * @memberof Driver
     */
    db: DbDriverChara;

    /**
     * True if this Driver is hidden from lists due to chapter constraints.
     *
     * @type {boolean}
     * @memberof Driver
     */
    isHidden: boolean;

    /**
     * The Blades directly bound to this Driver.
     */
    boundBlades: Blade[];
}
