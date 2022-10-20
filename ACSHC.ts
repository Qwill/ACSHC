import { 
    Item,
    itemAmount,
    print,
    guildStoreAvailable,
    myClass,
    haveSkill,
    Skill,
    stillsAvailable,
    hippyStoreAvailable,
    getProperty,
    haveOutfit,
    create,
    getIngredients,
    itemType,
    getCampground,
    inHardcore,
    creatableAmount,
    buy,
    outfit,
    cliExecute,
    myBasestat,
    toStat,
    setProperty,
    npcPrice,
    myMeat
} from 'kolmafia'

export function main(requestedNumber: string = '', simOption: string = ''): void {

    type BoozeTree = {[x in string]: {booze: string, other: string}}
    type Quantities = {baseBoozes: {[x in string]: number}, intermediateBoozes: {[x in string]: number}, garnishes: {[x in string]: number}, finishers: {[x in string]: number}}

    const finishedDrinks = ['tropical swill', 'pink pony', "slip 'n' slide", 'fuzzbump', 'ocean motion', 'fruity girl swill', 'ducha de oro', 'horizontal tango', 'roll in the hay', "a little sump'm sump'm", 'blended frozen swill', 'slap and tickle', "rockin' wagon", 'perpendicular hula', 'calle de miel', 'Neuromancer', 'vodka stratocaster', 'Mon Tiki', 'teqiwila slammer', 'Divine', 'Gordon Bennett', 'gimlet', 'yellow brick road', 'mandarina colada', 'tangarita', 'Mae West', 'prussian cathouse']
    
    const sim = simOption.toLowerCase() === 'sim' ? true : false
    const levelOneAC: BoozeTree = {} // these trees are to store ingredient associations. level one is the final drink and its ingredients, level two is the intermediate drink and its ingredients, and level three SHC is a special one to associate SHC garnishes with their base garnish
    const levelOneSHC: BoozeTree = {}
    const levelTwoAC: BoozeTree = {}
    const levelTwoSHC: BoozeTree = {}
    const levelThreeSHC: {[x in string]: string} = {}
    const numberOfDrinksRequested = Number(requestedNumber)
    const toCraft: [string, number][] = []
    const toBuy: [string, number][] = []
    const originalPref = getProperty('autoSatisfyWithNPCs') // this will be changed to true if buying garnishes, so save the original preference
    const mysticality = myBasestat(toStat('Mysticality')) // stats required to equip the appropriate outfit for the hippy store if needed
    const moxie = myBasestat(toStat('Moxie'))
    let quantities: Quantities = {baseBoozes: {}, intermediateBoozes: {}, garnishes: {}, finishers: {}} // quantities on hand. does not include closet
    let relevantSkill: 'AC' | 'SHC' = 'AC'
    let availableStills = stillsAvailable()
    let canBuy = false
    let appropriateOutfit = ''
    let finalCombination: string[] = []
    let finalItemsToBuy: string[] = []
    let remainingNumberOfDrinks = numberOfDrinksRequested // same as numberOfDrinksRequested, but decremented each loop of the script as needed
    let possibleDrinks: string[] = [] // each combination test will fill this out to be compared
    let possibleCombinations: string[][] = [] // changes on each loop: this is the total list of craftable drinks, including duplicates if the user can craft more than one
    let adjustedQuantities: Quantities = {baseBoozes: {}, intermediateBoozes: {}, garnishes: {}, finishers: {}} // same as quantities but reset and modified to consider every combination
    let bestCombination: string[] = [] // every combination calculated is tested against this array and overwrites it if it a better one
    let itemsUsedInCombination: number[] = [0, 0, 0] // stats to consider when comparing combinations with equal numbers of drinks. the elements are on-hand intermediate boozes used, distilled boozes/garnishes used, garnishes used. array is in order of importance and highest number wins
    let itemsToBuyInCombination: string[] = [] // matched to bestCombination
    let remainingStills = availableStills // reset and modified on each combination

    // input is all possible drinks that the user can craft, including possible duplicates if they can craft more than one. modifies output to contain all possible combinations of size "size". output must be defined outside since the function returns nothing. this is the slow part of the script. input size seems more of a factor than combination size, but both affect speed.
    function combinator(input: string[], output: string[][], data: string[], start: number, end: number, index: number, size: number): void {
        if (index === size) output.push(data.slice(0, size))
        for (let i = start; i <= end && end - i + 1 >= size - index; i++) {
            data[index] = input[i]
            combinator(input, output, data, i + 1, end, index + 1, size)
        }
    }

    function getItemAmount(whichItem: string): number {
        return itemAmount(Item.get(whichItem))
    }

    function getTotalPrice(): number {
        let totalPrice = 0
        for (let purchase of toBuy) totalPrice += npcPrice(Item.get(purchase[0])) * purchase[1]
        return totalPrice
    }

    // level one booze trees are filled later in the script; this function takes a level one tree and fills the corresponding level two tree. if SHC crafting applies, it also fills the level three tree. it also supplies number of on-hand ingredients to "quantity".
    function fillBoozeTrees(sourceTree: BoozeTree, targetTree: BoozeTree): void {
        for (let boozeKey in sourceTree) {
            const boozeItem: Item = Item.get(sourceTree[boozeKey].booze)
            const ingredients: string[] = Object.keys(getIngredients(boozeItem))
            if (ingredients.length === 0) continue
            if (itemType(Item.get(ingredients[0])) === 'booze') targetTree[sourceTree[boozeKey].booze] = {booze: ingredients[0], other: ingredients[1]}
            else targetTree[sourceTree[boozeKey].booze] = {booze: ingredients[1], other: ingredients[0]}
            const garnish: string = targetTree[sourceTree[boozeKey].booze].other
            const baseBooze: string = targetTree[sourceTree[boozeKey].booze].booze
            if (!(garnish in quantities.garnishes)) quantities.garnishes[garnish] = getItemAmount(garnish)
            if ((garnish === 'tonic water' || Item.get(garnish).quality === 'decent') && !(garnish in levelThreeSHC)) levelThreeSHC[garnish] = Object.keys(getIngredients(Item.get(garnish)))[0]
            if (!(baseBooze in quantities.baseBoozes)) quantities.baseBoozes[baseBooze] = getItemAmount(baseBooze)
            if (Item.get(baseBooze).quality === 'decent' && !(baseBooze in levelThreeSHC)) levelThreeSHC[baseBooze] = Object.keys(getIngredients(Item.get(baseBooze)))[0]
        }
    }

    // intended for use at the end of the script, filling toCraft and toBuy
    function addToDo(whichItem: string, output: [string, number][]): void {
        for (let i = 0; i < output.length; i++) {
            if (output[i][0] === whichItem) {
                output[i][1]++
                return
            }
        }
        output.push([whichItem, 1])
    }

    // runs once before finalCraft if the user can buy from the hippy store
    function finalBuy(): boolean {
        let outfitChanged = false
        if (toBuy.length === 0) return true
        if (originalPref === 'false') setProperty('autoSatisfyWithNPCs', 'true') // irrelevant in hardcore, but otherwise sets preference to the hippy store rather than the mall
        if (toBuy.length === 1 && toBuy[0][0] === 'soda water') appropriateOutfit = '' // soda water from the general store never requires an outfit
        if (appropriateOutfit !== '') {
            if (!outfit(appropriateOutfit)) { // changing outfits should not fail, but the script aborts if it does
                if (originalPref === 'false') setProperty('autoSatisfyWithNPCs', 'false')
                print('Failed to change into appropriate outfit, aborting.')
                return false
            }
            outfitChanged = true
        }
        if (getTotalPrice() > myMeat()) {
            if (originalPref === 'false') setProperty('autoSatisfyWithNPCs', 'false')
            if (outfitChanged && !cliExecute('outfit last')) print('Failed to re-equip previous outfit.') // as above, except failing to put on the last outfit doesn't affect the script, it's just annoying for the user, so will not abort
            print('You do not have enough meat to afford the necessary ingredients. Try a lower number of drinks or stop being poor.')
            return false
        }
        if (sim) {
            print('You will buy:')
            for (let purchase of toBuy) print(purchase[1].toString() + ' ' + (purchase[1] === 1 ? purchase[0] : Item.get(purchase[0]).plural))
            print('Total cost is ' + getTotalPrice().toString() + ' meat.')
            print ('')
        } else {
            for (let purchase of toBuy) {
                if (!buy(Item.get(purchase[0]), purchase[1])) { // again, this should not fail, but the script aborts if it does
                    if (originalPref === 'false') setProperty('autoSatisfyWithNPCs', 'false')
                    if (outfitChanged && !cliExecute('outfit last')) print('Failed to re-equip previous outfit.')
                    print('Ingredient purchase failed, aborting.')
                    return false
                } 
            }
        }
        if (originalPref === 'false') setProperty('autoSatisfyWithNPCs', 'false')
        if (outfitChanged && !cliExecute('outfit last')) print('Failed to re-equip previous outfit. Script will continue.') 
        return true
    }

    // last function of script to be executed
    function finalCraft(): void {
        if (sim) {
            print('You will craft:')
            for (let eachCraft of toCraft) print(eachCraft[1].toString() + ' ' + ((eachCraft[1] === 1) ? eachCraft[0] : Item.get(eachCraft[0]).plural))
            print ('')
            print ('Done!')
            return
        }
        for (let eachCraft of toCraft) {
            if (!create(Item.get(eachCraft[0]), eachCraft[1])) { // also should never fail
                print('Failed to craft drink, aborting.')
                return
            }
        }
        print('Done!')
    }

    // gives preference to using intermediate drinks on hand, and to using owned garnishes rather than buying. itemsUsed reflects these preferences
    function getACDrinkPossibility(drink: string, newQuantities: Quantities, itemsUsed: number[] = [0, 0, 0], garnishesNeeded: string[] = []): boolean {
        if (newQuantities.finishers[levelOneAC[drink].other] > 0) newQuantities.finishers[levelOneAC[drink].other]--
        else return false
        if (newQuantities.intermediateBoozes[levelOneAC[drink].booze] > 0) {
            newQuantities.intermediateBoozes[levelOneAC[drink].booze]--
            itemsUsed[0]++
        } else if (drink.indexOf('swill') === -1 && newQuantities.baseBoozes[levelTwoAC[levelOneAC[drink].booze].booze] > 0) { // do not check for swill ingredients as it has none
            newQuantities.baseBoozes[levelTwoAC[levelOneAC[drink].booze].booze]--
            if (newQuantities.garnishes[levelTwoAC[levelOneAC[drink].booze].other] === 0) {
                if (canBuy) garnishesNeeded.push(levelTwoAC[levelOneAC[drink].booze].other)
                else return false
            } else {
                newQuantities.garnishes[levelTwoAC[levelOneAC[drink].booze].other]--
                itemsUsed[2]++
            }
        } else return false
        return true
    }

    // same as above
    function getSHCDrinkPossibility(drink: string, newQuantities: Quantities, stills: {stills: number}, itemsUsed: number[] = [0, 0, 0], itemsToBuy: string[] = []): boolean {
        if (newQuantities.finishers[levelOneSHC[drink].other] > 0) newQuantities.finishers[levelOneSHC[drink].other]--
        else return false
        if (newQuantities.intermediateBoozes[levelOneSHC[drink].booze] > 0) {
            newQuantities.intermediateBoozes[levelOneSHC[drink].booze]--
            itemsUsed[0]++
        } else if (newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink].booze].booze] > 0 && newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink].booze].other] > 0) {
            newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink].booze].booze]--
            newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink].booze].other]--
            itemsUsed[1] += 2
        } else {
            let baseBoozeSatisfied = false
            let baseGarnishSatisfied = false
            if (newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink].booze].booze] > 0) {
                newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink].booze].booze]--
                itemsUsed[1]++ 
                baseBoozeSatisfied = true
            } else if (newQuantities.baseBoozes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink].booze].booze]] > 0 && stills.stills > 0) {
                newQuantities.baseBoozes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink].booze].booze]]--
                stills.stills--
                baseBoozeSatisfied = true
            }
            if (newQuantities.garnishes[levelTwoSHC[levelOneSHC[drink].booze].other] > 0) {
                newQuantities.garnishes[levelTwoSHC[levelOneSHC[drink].booze].other]--
                itemsUsed[1]++ 
                baseGarnishSatisfied = true
            } else if (stills.stills > 0) {
                if (newQuantities.garnishes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink].booze].other]] > 0) {
                    newQuantities.garnishes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink].booze].other]]-- 
                    itemsUsed[2]++
                    baseGarnishSatisfied = true
                } else if (canBuy) {
                    itemsToBuy.push(levelThreeSHC[levelTwoSHC[levelOneSHC[drink].booze].other])
                    stills.stills--
                    baseGarnishSatisfied = true
                }
            }
            return baseBoozeSatisfied && baseGarnishSatisfied
        }
        return true
    }

    // checks a possible combination against the previous best combination and overwrites it if it is better
    function store(storedQuantities: Quantities, storedCombination: string[], storedUsedItems: number[], storedGarnishesToBuy: string[] = [], stillsRemaining: number = -1): void {
        function storeExecute(): void {
            bestCombination = JSON.parse(JSON.stringify(storedCombination))
            adjustedQuantities = JSON.parse(JSON.stringify(storedQuantities))
            itemsUsedInCombination = JSON.parse(JSON.stringify(storedUsedItems))
            if (canBuy) itemsToBuyInCombination = JSON.parse(JSON.stringify(storedGarnishesToBuy))
            if (stillsRemaining >= 0) remainingStills = stillsRemaining
        }
        if (storedCombination.length > bestCombination.length) return storeExecute()
        if (storedCombination.length === bestCombination.length) {
            if (storedUsedItems[0] > itemsUsedInCombination[0] || 
            storedUsedItems[0] === itemsUsedInCombination[0] && storedUsedItems[1] > itemsUsedInCombination[1] ||
            storedUsedItems[0] === itemsUsedInCombination[0] && storedUsedItems[1] === itemsUsedInCombination[1] && storedUsedItems[2] > itemsUsedInCombination[2]) return storeExecute()
        }
    }

    function executeMainFunction(): void {
        if (canBuy && relevantSkill === 'AC') buyAC()
        else if (canBuy && relevantSkill === 'SHC') buySHC()
        else if (!canBuy && relevantSkill === 'AC') noBuyAC()
        else if (!canBuy && relevantSkill === 'SHC') noBuySHC()
    }

    function noBuyAC(): void {
        for (let finishedDrink of finishedDrinks.filter(function(drink) { return Item.get(drink).quality === 'good' })) {
            for (let i = 0; i < creatableAmount(Item.get(finishedDrink)) && i < 2; i++) possibleDrinks.push(finishedDrink) // note the "i < 2" present in this and all three other main functions. due to speed concerns with the cominbator function, even if a user can craft more than two of any drink, the additional possibilities are ignored. this brings the speed up to tolerable levels but may require the function to be run again. more on this later 
        }
        if (possibleDrinks.length < remainingNumberOfDrinks) possibleCombinations = [possibleDrinks]
        else combinator(possibleDrinks, possibleCombinations, Array(remainingNumberOfDrinks), 0, possibleDrinks.length - 1, 0, remainingNumberOfDrinks)
        for (let possibility of possibleCombinations) {
            const newQuantities: Quantities = JSON.parse(JSON.stringify(quantities))
            const usedItems: number[] = [0, 0, 0]
            for (let i = 0; i < possibility.length; i++) { // an inconsistency. this is the only main function to not use a getDrinkPossibility function, since it is the only one in which the possibleDrinks can be satisfied by mafia's creatableAmount function. to be fixed
                if (newQuantities.finishers[levelOneAC[possibility[i]].other] > 0) newQuantities.finishers[levelOneAC[possibility[i]].other]--
                else {
                    store(newQuantities, possibility.slice(0, i), usedItems)
                    break
                }
                if (newQuantities.intermediateBoozes[levelOneAC[possibility[i]].booze] > 0) {
                    newQuantities.intermediateBoozes[levelOneAC[possibility[i]].booze]--
                    usedItems[0]++
                } else if (newQuantities.baseBoozes[levelTwoAC[levelOneAC[possibility[i]].booze].booze] > 0 && newQuantities.garnishes[levelTwoAC[levelOneAC[possibility[i]].booze].other] > 0) {
                    newQuantities.baseBoozes[levelTwoAC[levelOneAC[possibility[i]].booze].booze]--
                    newQuantities.garnishes[levelTwoAC[levelOneAC[possibility[i]].booze].other]--
                } else {
                    store(newQuantities, possibility.slice(0, i), usedItems)
                    break
                }
                if (i === possibility.length - 1) store(newQuantities, possibility, usedItems)
            }
        }
    }

    function noBuySHC(): void {
        for (let finishedDrink of finishedDrinks.filter(function(drink) { return Item.get(drink).quality === 'awesome' })) {
            const tempQuantities: Quantities = JSON.parse(JSON.stringify(quantities))
            const tempStills: {stills: number} = {stills: availableStills}
            while (possibleDrinks.filter(function(d) {return d === finishedDrink}).length < 2 && getSHCDrinkPossibility(finishedDrink, tempQuantities, tempStills)) possibleDrinks.push(finishedDrink)
        }
        if (possibleDrinks.length < remainingNumberOfDrinks) possibleCombinations = [possibleDrinks]
        else combinator(possibleDrinks, possibleCombinations, Array(remainingNumberOfDrinks), 0, possibleDrinks.length - 1, 0, remainingNumberOfDrinks)
        for (let possibility of possibleCombinations) {
            const tempQuantities: Quantities = JSON.parse(JSON.stringify(quantities))
            const tempStills: {stills: number} = {stills: availableStills}
            const usedItems: number[] = [0, 0, 0]
            for (let i = 0; i < possibility.length; i++) {
                if (!getSHCDrinkPossibility(possibility[i], tempQuantities, tempStills, usedItems)) {
                    store(tempQuantities, possibility.slice(0, i), usedItems, [], tempStills.stills)
                    break
                }
                if (i === possibility.length - 1) store(tempQuantities, possibility, usedItems, [], tempStills.stills)
            }
        }
    }

    function buyAC(): void {
        for (let finishedDrink of finishedDrinks.filter(function(drink) { return Item.get(drink).quality === 'good' })) {
            const tempQuantities: Quantities = JSON.parse(JSON.stringify(quantities))
            while (possibleDrinks.filter(function(d) {return d === finishedDrink}).length < 2 && getACDrinkPossibility(finishedDrink, tempQuantities)) possibleDrinks.push(finishedDrink)
        }
        if (possibleDrinks.length < remainingNumberOfDrinks) possibleCombinations = [possibleDrinks]
        else combinator(possibleDrinks, possibleCombinations, Array(remainingNumberOfDrinks), 0, possibleDrinks.length - 1, 0, remainingNumberOfDrinks)
        for (let possibility of possibleCombinations) {
            const tempQuantities: Quantities = JSON.parse(JSON.stringify(quantities))
            const garnishesToBuy: string[] = []
            const usedItems: number[] = [0, 0, 0]
            for (let i = 0; i < possibility.length; i++) {
                if (!getACDrinkPossibility(possibility[i], tempQuantities, usedItems, garnishesToBuy)) {
                    store(tempQuantities, possibility.slice(0, i), usedItems, garnishesToBuy)
                    break
                }
                if (i === possibility.length - 1) store(tempQuantities, possibility, usedItems, garnishesToBuy)
            }
        }
    }

    function buySHC(): void {
        for (let finishedDrink of finishedDrinks.filter(function(drink) { return Item.get(drink).quality === 'awesome' })) {
            const tempQuantities: Quantities = JSON.parse(JSON.stringify(quantities))
            const tempStills: {stills: number} = {stills: availableStills}
            while (possibleDrinks.filter(function(d) {return d === finishedDrink}).length < 2 && getSHCDrinkPossibility(finishedDrink, tempQuantities, tempStills)) possibleDrinks.push(finishedDrink)
        }
        if (possibleDrinks.length < remainingNumberOfDrinks) possibleCombinations = [possibleDrinks]
        else combinator(possibleDrinks, possibleCombinations, Array(remainingNumberOfDrinks), 0, possibleDrinks.length - 1, 0, remainingNumberOfDrinks)
        for (let possibility of possibleCombinations) {
            const tempQuantities: Quantities = JSON.parse(JSON.stringify(quantities))
            const tempStills: {stills: number} = {stills: availableStills}
            const usedItems: number[] = [0, 0, 0]
            const garnishesToBuy: string[] = []
            for (let i = 0; i < possibility.length; i++) {
                if (!getSHCDrinkPossibility(possibility[i], tempQuantities, tempStills, usedItems, garnishesToBuy)) {
                    store(tempQuantities, possibility.slice(0, i), usedItems, garnishesToBuy, tempStills.stills)
                    break
                }
                if (i === possibility.length - 1) store(tempQuantities, possibility, usedItems, garnishesToBuy, tempStills.stills)
            }
        }
    }

    if (isNaN(numberOfDrinksRequested) || numberOfDrinksRequested <= 0 || !Number.isInteger(numberOfDrinksRequested) || numberOfDrinksRequested > 10) {
        return print('You need to enter a number of drinks between 1 and 10. You can also add "sim" to the end to get a simulation of what this script would do.')
    }

    if (!haveSkill(Skill.get('Advanced Cocktailcrafting'))) {
        return print('You need a cocktail crafting skill to use this command.')
    }

    if (!('Queue Du Coq cocktailcrafting kit' in getCampground())) {
        return print('You need to install a Queue Du Coq cocktailcrafting kit in your campground to craft advanced drinks.')
    }

    // was not sure about including this part, but the script really is not intended for non-hardcore usage.
    if (!inHardcore()) {
        print('You don\'t seem to be in a Hardcore run. This script will still work, but it will be slow and you probably have better options.')
    }

    if (haveSkill(Skill.get('Superhuman Cocktailcrafting')) &&
        (myClass().toString() === 'Accordion Thief' || myClass().toString() === 'Disco Bandit') &&
        guildStoreAvailable()
    ) relevantSkill = 'SHC'

    print('Calculating possible ' + relevantSkill + ' drinks...')
    
    // checks for appropriate outfit (if any) for accessing the hippy store and ensures the user has the stats to wear it
    if (hippyStoreAvailable()) {
        if (haveOutfit('Filthy Hippy Disguise') && moxie >= 15 && (getProperty('warProgress') === 'unstarted' || (getProperty('warProgress') === 'finished' && getProperty('sidequestOrchardCompleted') === 'none'))) {
            canBuy = true
            appropriateOutfit = 'Filthy Hippy Disguise'
        } else if (haveOutfit('Frat Warrior Fatigues') && moxie >= 70 && mysticality >= 70 && getProperty('warProgress') === 'started' && getProperty('sidequestOrchardCompleted') === 'fratboy') {
            canBuy = true
            appropriateOutfit = 'Frat Warrior Fatigues'
        } else if (haveOutfit('War Hippy Fatigues') && moxie >= 70 && mysticality >= 70 && getProperty('warProgress') === 'started' && getProperty('sidequestOrchardCompleted') === 'hippy') {
            canBuy = true
            appropriateOutfit = 'War Hippy Fatigues'
        } else if (getProperty('warProgress') === 'finished' && getProperty('sidequestOrchardCompleted') !== 'none') {
            canBuy = true
        }
    }

    // used for testing different scenarios
    // if (numberOfDrinksRequested > 0) relevantSkill = 'AC'
    // canBuy = false

    // fills out the level one trees and supplies "quantities" with the appropriate amounts. is not a function because it is always run exactly once and does not require special arguments
    for (let eachBooze of finishedDrinks) {
        const boozeItem: Item = Item.get(eachBooze)
        const ingredients: string[] = Object.keys(getIngredients(boozeItem))
        const correctOrder: boolean = itemType(Item.get(ingredients[0])) === 'booze' ? true : false
        const finisher: string = correctOrder ? ingredients[1] : ingredients[0]
        const intermediateBooze: string = correctOrder ? ingredients[0] : ingredients[1]
        if (!(finisher in quantities.finishers)) quantities.finishers[finisher] = getItemAmount(finisher)
        if (!(intermediateBooze in quantities.intermediateBoozes)) quantities.intermediateBoozes[intermediateBooze] = getItemAmount(intermediateBooze)
        if (boozeItem.quality === 'good') {
            if (correctOrder) levelOneAC[eachBooze] = {booze: ingredients[0], other: ingredients[1]}
            else levelOneAC[eachBooze] = {booze: ingredients[1], other: ingredients[0]}
        } else if (boozeItem.quality === 'awesome' && relevantSkill === 'SHC') {
            if (correctOrder) levelOneSHC[eachBooze] = {booze: ingredients[0], other: ingredients[1]}
            else levelOneSHC[eachBooze] = {booze: ingredients[1], other: ingredients[0]}
        }
    }

    fillBoozeTrees(levelOneAC, levelTwoAC) // AC drink ingredients are relevant even if the user is making SHC, mainly due to needing to know the garnishes, so this always runs
    if (relevantSkill === 'SHC') fillBoozeTrees(levelOneSHC, levelTwoSHC)

    // if there are any intermediate drinks already in inventory, craft them first if possible. it requires little logic, takes fewer turns in case of SHC, and is preferable to using up the base ingredients
    for (let i = 0; i < finishedDrinks.length; i -=- 1) {
        const quality: string = Item.get(finishedDrinks[i]).quality
        if ((quality === 'awesome' && relevantSkill === 'AC') || (quality === 'good' && relevantSkill === 'SHC')) continue
        const tree: BoozeTree = relevantSkill === 'AC' ? levelOneAC : levelOneSHC
        if (quantities.intermediateBoozes[tree[finishedDrinks[i]].booze] > 0 && quantities.finishers[tree[finishedDrinks[i]].other] > 0) {
            finalCombination.push(finishedDrinks[1])
            quantities.intermediateBoozes[tree[finishedDrinks[i]].booze]--
            quantities.finishers[tree[finishedDrinks[i]].other]--
            i--
            if (finalCombination.length === numberOfDrinksRequested) { // on the off chance that this satisfies the drinks requested, just end the script. finalBuy is unnecessary
                finalCraft()
                return
            }
        }
    }

    let previousResultLength: number = 0
    remainingNumberOfDrinks -= finalCombination.length

    executeMainFunction()

    finalCombination = JSON.parse(JSON.stringify(bestCombination))
    finalItemsToBuy = JSON.parse(JSON.stringify(itemsToBuyInCombination))

    if (finalCombination.length === 0) return print('You do not have the resources to craft any drinks.')

    while (finalCombination.length < numberOfDrinksRequested) { // due to the limitation of only being able to craft two of any type of drink, it may be necessary to rerun the script in case the optimal combination involves more than two of any drink
        previousResultLength = finalCombination.length // previous results must be tracked to make sure the script is making progress
        quantities = JSON.parse(JSON.stringify(adjustedQuantities))
        availableStills = remainingStills
        remainingNumberOfDrinks = numberOfDrinksRequested - finalCombination.length
        possibleDrinks = [] // reset temporary variables
        possibleCombinations = []
        adjustedQuantities = {baseBoozes: {}, intermediateBoozes: {}, garnishes: {}, finishers: {}}
        bestCombination = []
        itemsUsedInCombination = [0, 0, 0]
        itemsToBuyInCombination = []
        executeMainFunction()
        finalCombination = finalCombination.concat(bestCombination)
        finalItemsToBuy = finalItemsToBuy.concat(itemsToBuyInCombination)
        if (finalCombination.length === previousResultLength) break // if the script runs again and doesn't find a single additional drink to craft, it has done its best and the user will have to be satisfied with a lower number of drinks than requested
    }

    if (finalCombination.length < numberOfDrinksRequested) print('You only have sufficient resources to craft ' + finalCombination.length.toString() + ' drink' + (finalCombination.length === 1 ? '.' : 's. Proceeding.'))
    
    for (let drink of finalCombination) addToDo(drink, toCraft)
    if (canBuy) {
        for (let garnish of finalItemsToBuy) addToDo(garnish, toBuy)
        if (!finalBuy()) return // if the script was somehow unable to buy the needed ingredients, abort and do not try to craft anything
    }
    finalCraft()
}