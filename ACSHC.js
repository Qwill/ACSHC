"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = function(to, from, except, desc) {
  if (from && typeof from == "object" || typeof from == "function")
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++)
      key = keys[i], !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: function(k) {
        return from[k];
      }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = function(mod) {
  return __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
};

// src/main.ts
var main_exports = {};
__export(main_exports, {
  main: function() {
    return main;
  }
});
module.exports = __toCommonJS(main_exports);

// kolmafia-polyfill.js
var kolmafia = require("kolmafia"), console = {
  log: kolmafia.print
};

// src/main.ts
var import_kolmafia = require("kolmafia");
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
}
function _arrayLikeToArray(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function main() {
  var requestedNumber = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", simOption = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", finishedDrinks = ["tropical swill", "pink pony", "slip 'n' slide", "fuzzbump", "ocean motion", "fruity girl swill", "ducha de oro", "horizontal tango", "roll in the hay", "a little sump'm sump'm", "blended frozen swill", "slap and tickle", "rockin' wagon", "perpendicular hula", "calle de miel", "Neuromancer", "vodka stratocaster", "Mon Tiki", "teqiwila slammer", "Divine", "Gordon Bennett", "gimlet", "yellow brick road", "mandarina colada", "tangarita", "Mae West", "prussian cathouse"], sim = simOption.toLowerCase() === "sim", levelOneAC = {}, levelOneSHC = {}, levelTwoAC = {}, levelTwoSHC = {}, levelThreeSHC = {}, numberOfDrinksRequested = Number(requestedNumber), toCraft = [], toBuy = [], originalPref = (0, import_kolmafia.getProperty)("autoSatisfyWithNPCs"), mysticality = (0, import_kolmafia.myBasestat)((0, import_kolmafia.toStat)("Mysticality")), moxie = (0, import_kolmafia.myBasestat)((0, import_kolmafia.toStat)("Moxie")), quantities = {
    baseBoozes: {},
    intermediateBoozes: {},
    garnishes: {},
    finishers: {}
  }, relevantSkill = "AC", availableStills = (0, import_kolmafia.stillsAvailable)(), canBuy = !1, appropriateOutfit = "", finalCombination = [], finalItemsToBuy = [], remainingNumberOfDrinks = numberOfDrinksRequested, possibleDrinks = [], possibleCombinations = [], adjustedQuantities = {
    baseBoozes: {},
    intermediateBoozes: {},
    garnishes: {},
    finishers: {}
  }, bestCombination = [], itemsUsedInCombination = [0, 0, 0], itemsToBuyInCombination = [], remainingStills = availableStills;
  function combinator(input, output, data, start, end, index, size) {
    index === size && output.push(data.slice(0, size));
    for (var i2 = start; i2 <= end && end - i2 + 1 >= size - index; i2++)
      data[index] = input[i2], combinator(input, output, data, i2 + 1, end, index + 1, size);
  }
  function getItemAmount(whichItem) {
    return (0, import_kolmafia.itemAmount)(import_kolmafia.Item.get(whichItem));
  }
  function getTotalPrice() {
    var totalPrice = 0, _iterator = _createForOfIteratorHelper(toBuy), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var purchase = _step.value;
        totalPrice += (0, import_kolmafia.npcPrice)(import_kolmafia.Item.get(purchase[0])) * purchase[1];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return totalPrice;
  }
  function fillBoozeTrees(sourceTree, targetTree) {
    for (var boozeKey in sourceTree) {
      var boozeItem2 = import_kolmafia.Item.get(sourceTree[boozeKey].booze), ingredients2 = Object.keys((0, import_kolmafia.getIngredients)(boozeItem2));
      if (ingredients2.length !== 0) {
        (0, import_kolmafia.itemType)(import_kolmafia.Item.get(ingredients2[0])) === "booze" ? targetTree[sourceTree[boozeKey].booze] = {
          booze: ingredients2[0],
          other: ingredients2[1]
        } : targetTree[sourceTree[boozeKey].booze] = {
          booze: ingredients2[1],
          other: ingredients2[0]
        };
        var garnish2 = targetTree[sourceTree[boozeKey].booze].other, baseBooze = targetTree[sourceTree[boozeKey].booze].booze;
        garnish2 in quantities.garnishes || (quantities.garnishes[garnish2] = getItemAmount(garnish2)), (garnish2 === "tonic water" || import_kolmafia.Item.get(garnish2).quality === "decent") && !(garnish2 in levelThreeSHC) && (levelThreeSHC[garnish2] = Object.keys((0, import_kolmafia.getIngredients)(import_kolmafia.Item.get(garnish2)))[0]), baseBooze in quantities.baseBoozes || (quantities.baseBoozes[baseBooze] = getItemAmount(baseBooze)), import_kolmafia.Item.get(baseBooze).quality === "decent" && !(baseBooze in levelThreeSHC) && (levelThreeSHC[baseBooze] = Object.keys((0, import_kolmafia.getIngredients)(import_kolmafia.Item.get(baseBooze)))[0]);
      }
    }
  }
  function addToDo(whichItem, output) {
    for (var i2 = 0; i2 < output.length; i2++)
      if (output[i2][0] === whichItem) {
        output[i2][1]++;
        return;
      }
    output.push([whichItem, 1]);
  }
  function finalBuy() {
    var outfitChanged = !1;
    if (toBuy.length === 0)
      return !0;
    if (originalPref === "false" && (0, import_kolmafia.setProperty)("autoSatisfyWithNPCs", "true"), toBuy.length === 1 && toBuy[0][0] === "soda water" && (appropriateOutfit = ""), appropriateOutfit !== "") {
      if (!(0, import_kolmafia.outfit)(appropriateOutfit))
        return originalPref === "false" && (0, import_kolmafia.setProperty)("autoSatisfyWithNPCs", "false"), (0, import_kolmafia.print)("Failed to change into appropriate outfit, aborting."), !1;
      outfitChanged = !0;
    }
    if (getTotalPrice() > (0, import_kolmafia.myMeat)())
      return originalPref === "false" && (0, import_kolmafia.setProperty)("autoSatisfyWithNPCs", "false"), outfitChanged && !(0, import_kolmafia.cliExecute)("outfit last") && (0, import_kolmafia.print)("Failed to re-equip previous outfit."), (0, import_kolmafia.print)("You do not have enough meat to afford the necessary ingredients. Try a lower number of drinks or stop being poor."), !1;
    if (sim) {
      (0, import_kolmafia.print)("You will buy:");
      var _iterator2 = _createForOfIteratorHelper(toBuy), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var purchase = _step2.value;
          (0, import_kolmafia.print)(purchase[1].toString() + " " + (purchase[1] === 1 ? purchase[0] : import_kolmafia.Item.get(purchase[0]).plural));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      (0, import_kolmafia.print)("Total cost is " + getTotalPrice().toString() + " meat."), (0, import_kolmafia.print)("");
    } else {
      var _iterator3 = _createForOfIteratorHelper(toBuy), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var _purchase = _step3.value;
          if (!(0, import_kolmafia.buy)(import_kolmafia.Item.get(_purchase[0]), _purchase[1]))
            return originalPref === "false" && (0, import_kolmafia.setProperty)("autoSatisfyWithNPCs", "false"), outfitChanged && !(0, import_kolmafia.cliExecute)("outfit last") && (0, import_kolmafia.print)("Failed to re-equip previous outfit."), (0, import_kolmafia.print)("Ingredient purchase failed, aborting."), !1;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    return originalPref === "false" && (0, import_kolmafia.setProperty)("autoSatisfyWithNPCs", "false"), outfitChanged && !(0, import_kolmafia.cliExecute)("outfit last") && (0, import_kolmafia.print)("Failed to re-equip previous outfit. Script will continue."), !0;
  }
  function finalCraft() {
    if (sim) {
      (0, import_kolmafia.print)("You will craft:");
      var _iterator4 = _createForOfIteratorHelper(toCraft), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var eachCraft = _step4.value;
          (0, import_kolmafia.print)(eachCraft[1].toString() + " " + (eachCraft[1] === 1 ? eachCraft[0] : import_kolmafia.Item.get(eachCraft[0]).plural));
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      (0, import_kolmafia.print)(""), (0, import_kolmafia.print)("Done!");
      return;
    }
    var _iterator5 = _createForOfIteratorHelper(toCraft), _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
        var _eachCraft = _step5.value;
        if (!(0, import_kolmafia.create)(import_kolmafia.Item.get(_eachCraft[0]), _eachCraft[1])) {
          (0, import_kolmafia.print)("Failed to craft drink, aborting.");
          return;
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    (0, import_kolmafia.print)("Done!");
  }
  function getACDrinkPossibility(drink2, newQuantities) {
    var itemsUsed = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [0, 0, 0], garnishesNeeded = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [];
    if (newQuantities.finishers[levelOneAC[drink2].other] > 0)
      newQuantities.finishers[levelOneAC[drink2].other]--;
    else
      return !1;
    if (newQuantities.intermediateBoozes[levelOneAC[drink2].booze] > 0)
      newQuantities.intermediateBoozes[levelOneAC[drink2].booze]--, itemsUsed[0]++;
    else if (drink2.indexOf("swill") === -1 && newQuantities.baseBoozes[levelTwoAC[levelOneAC[drink2].booze].booze] > 0)
      if (newQuantities.baseBoozes[levelTwoAC[levelOneAC[drink2].booze].booze]--, newQuantities.garnishes[levelTwoAC[levelOneAC[drink2].booze].other] === 0)
        if (canBuy)
          garnishesNeeded.push(levelTwoAC[levelOneAC[drink2].booze].other);
        else
          return !1;
      else
        newQuantities.garnishes[levelTwoAC[levelOneAC[drink2].booze].other]--, itemsUsed[2]++;
    else
      return !1;
    return !0;
  }
  function getSHCDrinkPossibility(drink2, newQuantities, stills) {
    var itemsUsed = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [0, 0, 0], itemsToBuy = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
    if (newQuantities.finishers[levelOneSHC[drink2].other] > 0)
      newQuantities.finishers[levelOneSHC[drink2].other]--;
    else
      return !1;
    if (newQuantities.intermediateBoozes[levelOneSHC[drink2].booze] > 0)
      newQuantities.intermediateBoozes[levelOneSHC[drink2].booze]--, itemsUsed[0]++;
    else if (newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink2].booze].booze] > 0 && newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink2].booze].other] > 0)
      newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink2].booze].booze]--, newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink2].booze].other]--, itemsUsed[1] += 2;
    else {
      var baseBoozeSatisfied = !1, baseGarnishSatisfied = !1;
      return newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink2].booze].booze] > 0 ? (newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink2].booze].booze]--, itemsUsed[1]++, baseBoozeSatisfied = !0) : newQuantities.baseBoozes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].booze]] > 0 && stills.stills > 0 && (newQuantities.baseBoozes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].booze]]--, stills.stills--, baseBoozeSatisfied = !0), newQuantities.garnishes[levelTwoSHC[levelOneSHC[drink2].booze].other] > 0 ? (newQuantities.garnishes[levelTwoSHC[levelOneSHC[drink2].booze].other]--, itemsUsed[1]++, baseGarnishSatisfied = !0) : stills.stills > 0 && (newQuantities.garnishes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].other]] > 0 ? (newQuantities.garnishes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].other]]--, itemsUsed[2]++, baseGarnishSatisfied = !0) : canBuy && (itemsToBuy.push(levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].other]), stills.stills--, baseGarnishSatisfied = !0)), baseBoozeSatisfied && baseGarnishSatisfied;
    }
    return !0;
  }
  function store(storedQuantities, storedCombination, storedUsedItems) {
    var storedGarnishesToBuy = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [], stillsRemaining = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1;
    function storeExecute() {
      bestCombination = JSON.parse(JSON.stringify(storedCombination)), adjustedQuantities = JSON.parse(JSON.stringify(storedQuantities)), itemsUsedInCombination = JSON.parse(JSON.stringify(storedUsedItems)), canBuy && (itemsToBuyInCombination = JSON.parse(JSON.stringify(storedGarnishesToBuy))), stillsRemaining >= 0 && (remainingStills = stillsRemaining);
    }
    if (storedCombination.length > bestCombination.length || storedCombination.length === bestCombination.length && (storedUsedItems[0] > itemsUsedInCombination[0] || storedUsedItems[0] === itemsUsedInCombination[0] && storedUsedItems[1] > itemsUsedInCombination[1] || storedUsedItems[0] === itemsUsedInCombination[0] && storedUsedItems[1] === itemsUsedInCombination[1] && storedUsedItems[2] > itemsUsedInCombination[2]))
      return storeExecute();
  }
  function executeMainFunction() {
    canBuy && relevantSkill === "AC" ? buyAC() : canBuy && relevantSkill === "SHC" ? buySHC() : !canBuy && relevantSkill === "AC" ? noBuyAC() : !canBuy && relevantSkill === "SHC" && noBuySHC();
  }
  function noBuyAC() {
    var _iterator6 = _createForOfIteratorHelper(finishedDrinks.filter(function(drink2) {
      return import_kolmafia.Item.get(drink2).quality === "good";
    })), _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done; )
        for (var finishedDrink = _step6.value, i2 = 0; i2 < (0, import_kolmafia.creatableAmount)(import_kolmafia.Item.get(finishedDrink)) && i2 < 2; i2++)
          possibleDrinks.push(finishedDrink);
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    possibleDrinks.length < remainingNumberOfDrinks ? possibleCombinations = [possibleDrinks] : combinator(possibleDrinks, possibleCombinations, Array(remainingNumberOfDrinks), 0, possibleDrinks.length - 1, 0, remainingNumberOfDrinks);
    var _iterator7 = _createForOfIteratorHelper(possibleCombinations), _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done; )
        for (var possibility = _step7.value, newQuantities = JSON.parse(JSON.stringify(quantities)), usedItems = [0, 0, 0], _i = 0; _i < possibility.length; _i++) {
          if (newQuantities.finishers[levelOneAC[possibility[_i]].other] > 0)
            newQuantities.finishers[levelOneAC[possibility[_i]].other]--;
          else {
            store(newQuantities, possibility.slice(0, _i), usedItems);
            break;
          }
          if (newQuantities.intermediateBoozes[levelOneAC[possibility[_i]].booze] > 0)
            newQuantities.intermediateBoozes[levelOneAC[possibility[_i]].booze]--, usedItems[0]++;
          else if (newQuantities.baseBoozes[levelTwoAC[levelOneAC[possibility[_i]].booze].booze] > 0 && newQuantities.garnishes[levelTwoAC[levelOneAC[possibility[_i]].booze].other] > 0)
            newQuantities.baseBoozes[levelTwoAC[levelOneAC[possibility[_i]].booze].booze]--, newQuantities.garnishes[levelTwoAC[levelOneAC[possibility[_i]].booze].other]--;
          else {
            store(newQuantities, possibility.slice(0, _i), usedItems);
            break;
          }
          _i === possibility.length - 1 && store(newQuantities, possibility, usedItems);
        }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  }
  function noBuySHC() {
    var _iterator8 = _createForOfIteratorHelper(finishedDrinks.filter(function(drink2) {
      return import_kolmafia.Item.get(drink2).quality === "awesome";
    })), _step8;
    try {
      var _loop = function() {
        for (var finishedDrink = _step8.value, tempQuantities2 = JSON.parse(JSON.stringify(quantities)), tempStills2 = {
          stills: availableStills
        }; possibleDrinks.filter(function(d) {
          return d === finishedDrink;
        }).length < 2 && getSHCDrinkPossibility(finishedDrink, tempQuantities2, tempStills2); )
          possibleDrinks.push(finishedDrink);
      };
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done; )
        _loop();
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    possibleDrinks.length < remainingNumberOfDrinks ? possibleCombinations = [possibleDrinks] : combinator(possibleDrinks, possibleCombinations, Array(remainingNumberOfDrinks), 0, possibleDrinks.length - 1, 0, remainingNumberOfDrinks);
    var _iterator9 = _createForOfIteratorHelper(possibleCombinations), _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done; )
        for (var possibility = _step9.value, tempQuantities = JSON.parse(JSON.stringify(quantities)), tempStills = {
          stills: availableStills
        }, usedItems = [0, 0, 0], i2 = 0; i2 < possibility.length; i2++) {
          if (!getSHCDrinkPossibility(possibility[i2], tempQuantities, tempStills, usedItems)) {
            store(tempQuantities, possibility.slice(0, i2), usedItems, [], tempStills.stills);
            break;
          }
          i2 === possibility.length - 1 && store(tempQuantities, possibility, usedItems, [], tempStills.stills);
        }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
  }
  function buyAC() {
    var _iterator10 = _createForOfIteratorHelper(finishedDrinks.filter(function(drink2) {
      return import_kolmafia.Item.get(drink2).quality === "good";
    })), _step10;
    try {
      var _loop2 = function() {
        for (var finishedDrink = _step10.value, tempQuantities2 = JSON.parse(JSON.stringify(quantities)); possibleDrinks.filter(function(d) {
          return d === finishedDrink;
        }).length < 2 && getACDrinkPossibility(finishedDrink, tempQuantities2); )
          possibleDrinks.push(finishedDrink);
      };
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done; )
        _loop2();
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }
    possibleDrinks.length < remainingNumberOfDrinks ? possibleCombinations = [possibleDrinks] : combinator(possibleDrinks, possibleCombinations, Array(remainingNumberOfDrinks), 0, possibleDrinks.length - 1, 0, remainingNumberOfDrinks);
    var _iterator11 = _createForOfIteratorHelper(possibleCombinations), _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done; )
        for (var possibility = _step11.value, tempQuantities = JSON.parse(JSON.stringify(quantities)), garnishesToBuy = [], usedItems = [0, 0, 0], i2 = 0; i2 < possibility.length; i2++) {
          if (!getACDrinkPossibility(possibility[i2], tempQuantities, usedItems, garnishesToBuy)) {
            store(tempQuantities, possibility.slice(0, i2), usedItems, garnishesToBuy);
            break;
          }
          i2 === possibility.length - 1 && store(tempQuantities, possibility, usedItems, garnishesToBuy);
        }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
  }
  function buySHC() {
    var _iterator12 = _createForOfIteratorHelper(finishedDrinks.filter(function(drink2) {
      return import_kolmafia.Item.get(drink2).quality === "awesome";
    })), _step12;
    try {
      var _loop3 = function() {
        for (var finishedDrink = _step12.value, tempQuantities2 = JSON.parse(JSON.stringify(quantities)), tempStills2 = {
          stills: availableStills
        }; possibleDrinks.filter(function(d) {
          return d === finishedDrink;
        }).length < 2 && getSHCDrinkPossibility(finishedDrink, tempQuantities2, tempStills2); )
          possibleDrinks.push(finishedDrink);
      };
      for (_iterator12.s(); !(_step12 = _iterator12.n()).done; )
        _loop3();
    } catch (err) {
      _iterator12.e(err);
    } finally {
      _iterator12.f();
    }
    possibleDrinks.length < remainingNumberOfDrinks ? possibleCombinations = [possibleDrinks] : combinator(possibleDrinks, possibleCombinations, Array(remainingNumberOfDrinks), 0, possibleDrinks.length - 1, 0, remainingNumberOfDrinks);
    var _iterator13 = _createForOfIteratorHelper(possibleCombinations), _step13;
    try {
      for (_iterator13.s(); !(_step13 = _iterator13.n()).done; )
        for (var possibility = _step13.value, tempQuantities = JSON.parse(JSON.stringify(quantities)), tempStills = {
          stills: availableStills
        }, usedItems = [0, 0, 0], garnishesToBuy = [], i2 = 0; i2 < possibility.length; i2++) {
          if (!getSHCDrinkPossibility(possibility[i2], tempQuantities, tempStills, usedItems, garnishesToBuy)) {
            store(tempQuantities, possibility.slice(0, i2), usedItems, garnishesToBuy, tempStills.stills);
            break;
          }
          i2 === possibility.length - 1 && store(tempQuantities, possibility, usedItems, garnishesToBuy, tempStills.stills);
        }
    } catch (err) {
      _iterator13.e(err);
    } finally {
      _iterator13.f();
    }
  }
  if (isNaN(numberOfDrinksRequested) || numberOfDrinksRequested <= 0 || !Number.isInteger(numberOfDrinksRequested) || numberOfDrinksRequested > 10)
    return (0, import_kolmafia.print)('You need to enter a number of drinks between 1 and 10. You can also add "sim" to the end to get a simulation of what this script would do.');
  if (!(0, import_kolmafia.haveSkill)(import_kolmafia.Skill.get("Advanced Cocktailcrafting")))
    return (0, import_kolmafia.print)("You need a cocktail crafting skill to use this command.");
  if (!("Queue Du Coq cocktailcrafting kit" in (0, import_kolmafia.getCampground)()))
    return (0, import_kolmafia.print)("You need to install a Queue Du Coq cocktailcrafting kit in your campground to craft advanced drinks.");
  (0, import_kolmafia.inHardcore)() || (0, import_kolmafia.print)("You don't seem to be in a Hardcore run. This script will still work, but it will be slow and you probably have better options."), (0, import_kolmafia.haveSkill)(import_kolmafia.Skill.get("Superhuman Cocktailcrafting")) && ((0, import_kolmafia.myClass)().toString() === "Accordion Thief" || (0, import_kolmafia.myClass)().toString() === "Disco Bandit") && (0, import_kolmafia.guildStoreAvailable)() && (relevantSkill = "SHC"), (0, import_kolmafia.print)("Calculating possible " + relevantSkill + " drinks..."), (0, import_kolmafia.hippyStoreAvailable)() && ((0, import_kolmafia.haveOutfit)("Filthy Hippy Disguise") && moxie >= 15 && ((0, import_kolmafia.getProperty)("warProgress") === "unstarted" || (0, import_kolmafia.getProperty)("warProgress") === "finished" && (0, import_kolmafia.getProperty)("sidequestOrchardCompleted") === "none") ? (canBuy = !0, appropriateOutfit = "Filthy Hippy Disguise") : (0, import_kolmafia.haveOutfit)("Frat Warrior Fatigues") && moxie >= 70 && mysticality >= 70 && (0, import_kolmafia.getProperty)("warProgress") === "started" && (0, import_kolmafia.getProperty)("sidequestOrchardCompleted") === "fratboy" ? (canBuy = !0, appropriateOutfit = "Frat Warrior Fatigues") : (0, import_kolmafia.haveOutfit)("War Hippy Fatigues") && moxie >= 70 && mysticality >= 70 && (0, import_kolmafia.getProperty)("warProgress") === "started" && (0, import_kolmafia.getProperty)("sidequestOrchardCompleted") === "hippy" ? (canBuy = !0, appropriateOutfit = "War Hippy Fatigues") : (0, import_kolmafia.getProperty)("warProgress") === "finished" && (0, import_kolmafia.getProperty)("sidequestOrchardCompleted") !== "none" && (canBuy = !0));
  for (var _i2 = 0, _finishedDrinks = finishedDrinks; _i2 < _finishedDrinks.length; _i2++) {
    var eachBooze = _finishedDrinks[_i2], boozeItem = import_kolmafia.Item.get(eachBooze), ingredients = Object.keys((0, import_kolmafia.getIngredients)(boozeItem)), correctOrder = (0, import_kolmafia.itemType)(import_kolmafia.Item.get(ingredients[0])) === "booze", finisher = correctOrder ? ingredients[1] : ingredients[0], intermediateBooze = correctOrder ? ingredients[0] : ingredients[1];
    finisher in quantities.finishers || (quantities.finishers[finisher] = getItemAmount(finisher)), intermediateBooze in quantities.intermediateBoozes || (quantities.intermediateBoozes[intermediateBooze] = getItemAmount(intermediateBooze)), boozeItem.quality === "good" ? correctOrder ? levelOneAC[eachBooze] = {
      booze: ingredients[0],
      other: ingredients[1]
    } : levelOneAC[eachBooze] = {
      booze: ingredients[1],
      other: ingredients[0]
    } : boozeItem.quality === "awesome" && relevantSkill === "SHC" && (correctOrder ? levelOneSHC[eachBooze] = {
      booze: ingredients[0],
      other: ingredients[1]
    } : levelOneSHC[eachBooze] = {
      booze: ingredients[1],
      other: ingredients[0]
    });
  }
  fillBoozeTrees(levelOneAC, levelTwoAC), relevantSkill === "SHC" && fillBoozeTrees(levelOneSHC, levelTwoSHC);
  for (var i = 0; i < finishedDrinks.length; i -= -1) {
    var quality = import_kolmafia.Item.get(finishedDrinks[i]).quality;
    if (!(quality === "awesome" && relevantSkill === "AC" || quality === "good" && relevantSkill === "SHC")) {
      var tree = relevantSkill === "AC" ? levelOneAC : levelOneSHC;
      if (quantities.intermediateBoozes[tree[finishedDrinks[i]].booze] > 0 && quantities.finishers[tree[finishedDrinks[i]].other] > 0 && (finalCombination.push(finishedDrinks[1]), quantities.intermediateBoozes[tree[finishedDrinks[i]].booze]--, quantities.finishers[tree[finishedDrinks[i]].other]--, i--, finalCombination.length === numberOfDrinksRequested)) {
        finalCraft();
        return;
      }
    }
  }
  var previousResultLength = 0;
  if (remainingNumberOfDrinks -= finalCombination.length, executeMainFunction(), finalCombination = JSON.parse(JSON.stringify(bestCombination)), finalItemsToBuy = JSON.parse(JSON.stringify(itemsToBuyInCombination)), finalCombination.length === 0)
    return (0, import_kolmafia.print)("You do not have the resources to craft any drinks.");
  for (; finalCombination.length < numberOfDrinksRequested && (previousResultLength = finalCombination.length, quantities = JSON.parse(JSON.stringify(adjustedQuantities)), availableStills = remainingStills, remainingNumberOfDrinks = numberOfDrinksRequested - finalCombination.length, possibleDrinks = [], possibleCombinations = [], adjustedQuantities = {
    baseBoozes: {},
    intermediateBoozes: {},
    garnishes: {},
    finishers: {}
  }, bestCombination = [], itemsUsedInCombination = [0, 0, 0], itemsToBuyInCombination = [], executeMainFunction(), finalCombination = finalCombination.concat(bestCombination), finalItemsToBuy = finalItemsToBuy.concat(itemsToBuyInCombination), finalCombination.length !== previousResultLength); )
    ;
  finalCombination.length < numberOfDrinksRequested && (0, import_kolmafia.print)("You only have sufficient resources to craft " + finalCombination.length.toString() + " drink" + (finalCombination.length === 1 ? "." : "s. Proceeding."));
  var _iterator14 = _createForOfIteratorHelper(finalCombination), _step14;
  try {
    for (_iterator14.s(); !(_step14 = _iterator14.n()).done; ) {
      var drink = _step14.value;
      addToDo(drink, toCraft);
    }
  } catch (err) {
    _iterator14.e(err);
  } finally {
    _iterator14.f();
  }
  if (canBuy) {
    var _iterator15 = _createForOfIteratorHelper(finalItemsToBuy), _step15;
    try {
      for (_iterator15.s(); !(_step15 = _iterator15.n()).done; ) {
        var garnish = _step15.value;
        addToDo(garnish, toBuy);
      }
    } catch (err) {
      _iterator15.e(err);
    } finally {
      _iterator15.f();
    }
    if (!finalBuy())
      return;
  }
  finalCraft();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
