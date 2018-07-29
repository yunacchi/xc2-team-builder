// Courtesy of https://gist.github.com/axelpale/3118596 .
// MIT license. Adapted for TypeScript.
export function computeKCombinations<T>(set: T[], k: number): T[][] {
    if (k > set.length || k <= 0) {
        return [];
    }
    if (k === set.length) {
        return [set];
    }
    const combs: T[][] = [];
    if (k === 1) {
        for (let i = 0; i < set.length; i++) {
            combs.push([set[i]]);
        }
        return combs;
    }
    for (let i = 0; i < set.length - k + 1; i++) {
        const head = set.slice(i, i + 1);
        const tailcombs = computeKCombinations(set.slice(i + 1), k - 1);
        for (let j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}

// Courtesy of https://gist.github.com/axelpale/3118596 .
// MIT license. Adapted for TypeScript.
export function computeCombinations<T>(set: T[]): T[][] {
    const combs: T[][] = [];
    for (let k = 1; k <= set.length; k++) {
        const k_combs = computeKCombinations(set, k);
        for (let i = 0; i < k_combs.length; i++) {
            combs.push(k_combs[i]);
        }
    }
    return combs;
}

export function reorderAndDistinct<T>(sets: T[][]): T[][] {
    const newSets: T[][] = [];
    sets.forEach(s => {
        s = s.sort();

        if (!newSets.some(ns => {
            return ns.length === s.length
                && ns.every((v, i) => s[i] === v);
        })) {
            newSets.push(s);
        }
    });
    return newSets;
}
