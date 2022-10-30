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
  var arg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  (0, import_kolmafia.print)("ACSHC v1.0.0");
  var finishedDrinks = ["tropical swill", "pink pony", "slip 'n' slide", "fuzzbump", "ocean motion", "fruity girl swill", "ducha de oro", "horizontal tango", "roll in the hay", "a little sump'm sump'm", "blended frozen swill", "slap and tickle", "rockin' wagon", "perpendicular hula", "calle de miel", "Neuromancer", "vodka stratocaster", "Mon Tiki", "teqiwila slammer", "Divine", "Gordon Bennett", "gimlet", "yellow brick road", "mandarina colada", "tangarita", "Mae West", "prussian cathouse"], levelOneAC = {}, levelOneSHC = {}, levelTwoAC = {}, levelTwoSHC = {}, levelThreeSHC = {}, toCraft = [], toBuy = [], originalPref = (0, import_kolmafia.getProperty)("autoSatisfyWithNPCs"), mysticality = (0, import_kolmafia.myBasestat)((0, import_kolmafia.toStat)("Mysticality")), moxie = (0, import_kolmafia.myBasestat)((0, import_kolmafia.toStat)("Moxie")), canCraftSHC = !!((0, import_kolmafia.haveSkill)(import_kolmafia.Skill.get("Mixologist")) || (0, import_kolmafia.haveSkill)(import_kolmafia.Skill.get("Superhuman Cocktailcrafting")) && ((0, import_kolmafia.myClass)().toString() === "Accordion Thief" || (0, import_kolmafia.myClass)().toString() === "Disco Bandit") && (0, import_kolmafia.guildStoreAvailable)()), args = arg.split(" "), override = !1, drinkSkill = "", sim = !1, numberOfDrinksRequested = 0, quantities = {
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
  function getItemAmount(whichItem) {
    return (0, import_kolmafia.itemAmount)(import_kolmafia.Item.get(whichItem));
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
  function craftIntermediaries() {
    for (var i2 = 0; i2 < finishedDrinks.length; i2++) {
      var quality = import_kolmafia.Item.get(finishedDrinks[i2]).quality;
      if (!(quality === "awesome" && relevantSkill === "AC" || quality === "good" && relevantSkill === "SHC")) {
        var tree = relevantSkill === "AC" ? levelOneAC : levelOneSHC;
        if (quantities.intermediateBoozes[tree[finishedDrinks[i2]].booze] > 0 && quantities.finishers[tree[finishedDrinks[i2]].other] > 0 && (finalCombination.push(finishedDrinks[1]), quantities.intermediateBoozes[tree[finishedDrinks[i2]].booze]--, quantities.finishers[tree[finishedDrinks[i2]].other]--, i2--, finalCombination.length === numberOfDrinksRequested)) {
          var _iterator = _createForOfIteratorHelper(finalCombination), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var drink2 = _step.value;
              addToDo(drink2, toCraft);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return finalCraft(), !0;
        }
      }
    }
    return !1;
  }
  function getACDrinkPossibility(drink2, newQuantities, stills) {
    var itemsUsed = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [0, 0, 0], garnishesNeeded = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [], originalNewQuantities = JSON.parse(JSON.stringify(newQuantities));
    if (newQuantities.finishers[levelOneAC[drink2].other] > 0)
      newQuantities.finishers[levelOneAC[drink2].other]--;
    else
      return !1;
    if (newQuantities.intermediateBoozes[levelOneAC[drink2].booze] > 0)
      newQuantities.intermediateBoozes[levelOneAC[drink2].booze]--, itemsUsed[0]++;
    else if (drink2.indexOf("swill") === -1 && newQuantities.baseBoozes[levelTwoAC[levelOneAC[drink2].booze].booze] > 0)
      if (newQuantities.baseBoozes[levelTwoAC[levelOneAC[drink2].booze].booze]--, newQuantities.garnishes[levelTwoAC[levelOneAC[drink2].booze].other] === 0)
        if (canBuy || levelTwoAC[levelOneAC[drink2].booze].other === "soda water")
          garnishesNeeded.push(levelTwoAC[levelOneAC[drink2].booze].other);
        else
          return newQuantities = originalNewQuantities, !1;
      else
        newQuantities.garnishes[levelTwoAC[levelOneAC[drink2].booze].other]--, itemsUsed[2]++;
    else
      return newQuantities = originalNewQuantities, !1;
    return !0;
  }
  function getSHCDrinkPossibility(drink2, newQuantities, stills) {
    var itemsUsed = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [0, 0, 0], itemsToBuy = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [], originalNewQuantities = JSON.parse(JSON.stringify(newQuantities)), originalStills = JSON.parse(JSON.stringify(stills)), originalItemsUsed = JSON.parse(JSON.stringify(itemsUsed)), originalItemsToBuy = JSON.parse(JSON.stringify(itemsToBuy));
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
      if (newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink2].booze].booze] > 0 ? (newQuantities.baseBoozes[levelTwoSHC[levelOneSHC[drink2].booze].booze]--, itemsUsed[1]++, baseBoozeSatisfied = !0) : newQuantities.baseBoozes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].booze]] > 0 && stills.stills > 0 && (newQuantities.baseBoozes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].booze]]--, stills.stills--, baseBoozeSatisfied = !0), newQuantities.garnishes[levelTwoSHC[levelOneSHC[drink2].booze].other] > 0 ? (newQuantities.garnishes[levelTwoSHC[levelOneSHC[drink2].booze].other]--, itemsUsed[1]++, baseGarnishSatisfied = !0) : stills.stills > 0 && (newQuantities.garnishes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].other]] > 0 ? (newQuantities.garnishes[levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].other]]--, itemsUsed[2]++, baseGarnishSatisfied = !0) : (canBuy || levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].other] === "soda water") && (itemsToBuy.push(levelThreeSHC[levelTwoSHC[levelOneSHC[drink2].booze].other]), stills.stills--, baseGarnishSatisfied = !0)), !(baseBoozeSatisfied && baseGarnishSatisfied))
        return newQuantities = originalNewQuantities, stills = originalStills, itemsUsed = originalItemsUsed, itemsToBuy = originalItemsToBuy, !1;
    }
    return !0;
  }
  function combinator(input, output, data, start, end, index, size) {
    index === size && output.push(data.slice(0, size));
    for (var i2 = start; i2 <= end && end - i2 + 1 >= size - index; i2++)
      data[index] = input[i2], combinator(input, output, data, i2 + 1, end, index + 1, size);
  }
  function store(storedQuantities, storedCombination, storedUsedItems) {
    var storedGarnishesToBuy = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [], stillsRemaining = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1;
    function storeExecute() {
      bestCombination = JSON.parse(JSON.stringify(storedCombination)), adjustedQuantities = JSON.parse(JSON.stringify(storedQuantities)), itemsUsedInCombination = JSON.parse(JSON.stringify(storedUsedItems)), itemsToBuyInCombination = JSON.parse(JSON.stringify(storedGarnishesToBuy)), stillsRemaining >= 0 && (remainingStills = stillsRemaining);
    }
    if (storedCombination.length > bestCombination.length || storedCombination.length === bestCombination.length && (storedUsedItems[0] > itemsUsedInCombination[0] || storedUsedItems[0] === itemsUsedInCombination[0] && storedUsedItems[1] > itemsUsedInCombination[1] || storedUsedItems[0] === itemsUsedInCombination[0] && storedUsedItems[1] === itemsUsedInCombination[1] && storedUsedItems[2] > itemsUsedInCombination[2]))
      return storeExecute();
  }
  function getDrinks() {
    var getDrinkPossibility = relevantSkill === "AC" ? getACDrinkPossibility : getSHCDrinkPossibility, _iterator2 = _createForOfIteratorHelper(finishedDrinks.filter(function(drink2) {
      return import_kolmafia.Item.get(drink2).quality === (relevantSkill === "AC" ? "good" : "awesome");
    })), _step2;
    try {
      var _loop = function() {
        for (var finishedDrink = _step2.value, tempQuantities2 = JSON.parse(JSON.stringify(quantities)), tempStills2 = {
          stills: availableStills
        }; possibleDrinks.filter(function(d) {
          return d === finishedDrink;
        }).length < 2 && getDrinkPossibility(finishedDrink, tempQuantities2, tempStills2); )
          possibleDrinks.push(finishedDrink);
      };
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; )
        _loop();
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    possibleDrinks.length < remainingNumberOfDrinks ? possibleCombinations = [possibleDrinks] : combinator(possibleDrinks, possibleCombinations, Array(remainingNumberOfDrinks), 0, possibleDrinks.length - 1, 0, remainingNumberOfDrinks);
    var _iterator3 = _createForOfIteratorHelper(possibleCombinations), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; )
        for (var possibility = _step3.value, tempQuantities = JSON.parse(JSON.stringify(quantities)), tempStills = {
          stills: availableStills
        }, usedItems = [0, 0, 0], garnishesToBuy = [], i2 = 0; i2 < possibility.length; i2++) {
          if (!getDrinkPossibility(possibility[i2], tempQuantities, tempStills, usedItems, garnishesToBuy)) {
            store(tempQuantities, possibility.slice(0, i2), usedItems, garnishesToBuy, tempStills.stills);
            break;
          }
          i2 === possibility.length - 1 && store(tempQuantities, possibility, usedItems, garnishesToBuy, tempStills.stills);
        }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  function getAllDrinks() {
    var previousResultLength = 0;
    if (remainingNumberOfDrinks = numberOfDrinksRequested - finalCombination.length, getDrinks(), finalCombination = finalCombination.concat(bestCombination), finalItemsToBuy = finalItemsToBuy.concat(itemsToBuyInCombination), finalCombination.length === 0)
      return !1;
    for (; finalCombination.length < numberOfDrinksRequested && (previousResultLength = finalCombination.length, quantities = JSON.parse(JSON.stringify(adjustedQuantities)), availableStills = remainingStills, remainingNumberOfDrinks = numberOfDrinksRequested - finalCombination.length, possibleDrinks = [], possibleCombinations = [], adjustedQuantities = {
      baseBoozes: {},
      intermediateBoozes: {},
      garnishes: {},
      finishers: {}
    }, bestCombination = [], itemsUsedInCombination = [0, 0, 0], itemsToBuyInCombination = [], getDrinks(), finalCombination = finalCombination.concat(bestCombination), finalItemsToBuy = finalItemsToBuy.concat(itemsToBuyInCombination), finalCombination.length !== previousResultLength); )
      ;
    return !(finalCombination.length < numberOfDrinksRequested);
  }
  function addToDo(whichItem, output) {
    for (var i2 = 0; i2 < output.length; i2++)
      if (output[i2][0] === whichItem) {
        output[i2][1]++;
        return;
      }
    output.push([whichItem, 1]);
  }
  function getTotalPrice() {
    var totalPrice = 0, _iterator4 = _createForOfIteratorHelper(toBuy), _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
        var purchase = _step4.value;
        totalPrice += (0, import_kolmafia.npcPrice)(import_kolmafia.Item.get(purchase[0])) * purchase[1];
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return totalPrice;
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
      var _iterator5 = _createForOfIteratorHelper(toBuy), _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          var purchase = _step5.value;
          (0, import_kolmafia.print)(purchase[1].toString() + " " + (purchase[1] === 1 ? purchase[0] : import_kolmafia.Item.get(purchase[0]).plural));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      (0, import_kolmafia.print)("Total cost is " + getTotalPrice().toString() + " meat."), (0, import_kolmafia.print)("");
    } else {
      var _iterator6 = _createForOfIteratorHelper(toBuy), _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
          var _purchase = _step6.value;
          if (!(0, import_kolmafia.buy)(import_kolmafia.Item.get(_purchase[0]), _purchase[1]))
            return originalPref === "false" && (0, import_kolmafia.setProperty)("autoSatisfyWithNPCs", "false"), outfitChanged && !(0, import_kolmafia.cliExecute)("outfit last") && (0, import_kolmafia.print)("Failed to re-equip previous outfit."), (0, import_kolmafia.print)("Ingredient purchase failed, aborting."), !1;
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
    return originalPref === "false" && (0, import_kolmafia.setProperty)("autoSatisfyWithNPCs", "false"), outfitChanged && !(0, import_kolmafia.cliExecute)("outfit last") && (0, import_kolmafia.print)("Failed to re-equip previous outfit. Script will continue."), !0;
  }
  function finalCraft() {
    if (sim) {
      (0, import_kolmafia.print)("You will craft:");
      for (var _i = 0, _toCraft = toCraft; _i < _toCraft.length; _i++) {
        var eachCraft = _toCraft[_i];
        (0, import_kolmafia.print)(eachCraft[1].toString() + " " + (eachCraft[1] === 1 ? eachCraft[0] : import_kolmafia.Item.get(eachCraft[0]).plural));
      }
      (0, import_kolmafia.print)(""), (0, import_kolmafia.print)("Done!");
      return;
    }
    for (var _i2 = 0, _toCraft2 = toCraft; _i2 < _toCraft2.length; _i2++) {
      var _eachCraft = _toCraft2[_i2];
      if (!(0, import_kolmafia.create)(import_kolmafia.Item.get(_eachCraft[0]), _eachCraft[1])) {
        (0, import_kolmafia.print)("Failed to craft drink, aborting.");
        return;
      }
    }
    (0, import_kolmafia.print)(""), (0, import_kolmafia.print)("You have crafted:");
    for (var _i3 = 0, _toCraft3 = toCraft; _i3 < _toCraft3.length; _i3++) {
      var _eachCraft2 = _toCraft3[_i3];
      (0, import_kolmafia.print)(_eachCraft2[1].toString() + " " + (_eachCraft2[1] === 1 ? _eachCraft2[0] : import_kolmafia.Item.get(_eachCraft2[0]).plural));
    }
    (0, import_kolmafia.print)("Done!");
  }
  for (var i = 0; i < args.length; i++)
    if (args[i] = args[i].toLowerCase(), args[i] === "ac" || args[i] === "shc" || args[i] === "both") {
      if (drinkSkill !== "")
        return (0, import_kolmafia.print)("Syntax error: multiple arguments for drink skill found.");
      drinkSkill = args[i];
    } else if (args[i] === "fill" || args[i] === "overfill") {
      if (numberOfDrinksRequested !== 0)
        return (0, import_kolmafia.print)("Syntax error: multiple arguments for number of drinks found.");
      var liver = (0, import_kolmafia.inebrietyLimit)(), drunkenness = (0, import_kolmafia.myInebriety)();
      if (drunkenness > liver)
        return (0, import_kolmafia.print)("You are already overdrunk.");
      if (numberOfDrinksRequested = Math.floor((liver - drunkenness) / 4), numberOfDrinksRequested === 0 && args[i] !== "overfill")
        return (0, import_kolmafia.print)("You do not have room in your liver for any more AC or SHC drinks.");
      args[i] === "overfill" && numberOfDrinksRequested++;
    } else if (args[i] === "sim") {
      if (sim)
        return (0, import_kolmafia.print)("Syntax error: multiple arguments for simulation found.");
      sim = !0;
    } else if (args[i] === "override") {
      if (override)
        return (0, import_kolmafia.print)("Syntax error: multiple arguments for override found.");
      override = !0;
    } else {
      var num = Number(args[i]);
      if (!isNaN(num) && Number.isInteger(num) && num > 0 && num <= 10) {
        if (numberOfDrinksRequested !== 0)
          return (0, import_kolmafia.print)("Syntax error: multiple arguments for number of drinks found.");
        numberOfDrinksRequested = num;
      }
    }
  if (numberOfDrinksRequested === 0)
    return (0, import_kolmafia.print)('You need to enter a number of drinks between 1 and 10, or use "fill" or "overfill". You can also add "sim" to the end to get a simulation of what this script would do.');
  if (!(0, import_kolmafia.haveSkill)(import_kolmafia.Skill.get("Advanced Cocktailcrafting")) && !(0, import_kolmafia.haveSkill)(import_kolmafia.Skill.get("Mixologist")))
    return (0, import_kolmafia.print)("You need a cocktail crafting skill to use this command.");
  if (!("Queue Du Coq cocktailcrafting kit" in (0, import_kolmafia.getCampground)()))
    return (0, import_kolmafia.print)("You need to install a Queue Du Coq cocktailcrafting kit in your campground to craft advanced drinks.");
  if ((0, import_kolmafia.inHardcore)() || (0, import_kolmafia.print)("You don't seem to be in a Hardcore run. This script will still work, but it may be slow and you probably have better options."), override || ((0, import_kolmafia.myPath)() === import_kolmafia.Path.get("License to Adventure") && (finishedDrinks = ["gibson", "vodka gibson", "rockin' wagon"]), (0, import_kolmafia.myPath)() === import_kolmafia.Path.get("Bees Hate You") && (finishedDrinks = finishedDrinks.filter(function(drink2) {
    return drink2.indexOf("b") === -1 && drink2.indexOf("B") === -1;
  })), (0, import_kolmafia.myPath)() === import_kolmafia.Path.get("G-Lover") && (finishedDrinks = finishedDrinks.filter(function(drink2) {
    return drink2.indexOf("g") !== -1 || drink2.indexOf("G") !== -1;
  }))), !canCraftSHC && (drinkSkill === "shc" || drinkSkill === "both"))
    return (0, import_kolmafia.print)("You are not currently able to craft SHC drinks.");
  (drinkSkill === "shc" || drinkSkill === "both" || canCraftSHC && drinkSkill !== "ac") && (relevantSkill = "SHC"), (0, import_kolmafia.hippyStoreAvailable)() && ((0, import_kolmafia.haveOutfit)("Filthy Hippy Disguise") && moxie >= 15 && ((0, import_kolmafia.getProperty)("warProgress") === "unstarted" || (0, import_kolmafia.getProperty)("warProgress") === "finished" && (0, import_kolmafia.getProperty)("sidequestOrchardCompleted") === "none") ? (canBuy = !0, appropriateOutfit = "Filthy Hippy Disguise") : (0, import_kolmafia.haveOutfit)("Frat Warrior Fatigues") && moxie >= 70 && mysticality >= 70 && (0, import_kolmafia.getProperty)("warProgress") === "started" && (0, import_kolmafia.getProperty)("sidequestOrchardCompleted") === "fratboy" ? (canBuy = !0, appropriateOutfit = "Frat Warrior Fatigues") : (0, import_kolmafia.haveOutfit)("War Hippy Fatigues") && moxie >= 70 && mysticality >= 70 && (0, import_kolmafia.getProperty)("warProgress") === "started" && (0, import_kolmafia.getProperty)("sidequestOrchardCompleted") === "hippy" ? (canBuy = !0, appropriateOutfit = "War Hippy Fatigues") : (0, import_kolmafia.getProperty)("warProgress") === "finished" && (0, import_kolmafia.getProperty)("sidequestOrchardCompleted") !== "none" && (canBuy = !0));
  var _iterator7 = _createForOfIteratorHelper(finishedDrinks), _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
      var eachBooze = _step7.value, boozeItem = import_kolmafia.Item.get(eachBooze), ingredients = Object.keys((0, import_kolmafia.getIngredients)(boozeItem)), correctOrder = (0, import_kolmafia.itemType)(import_kolmafia.Item.get(ingredients[0])) === "booze", finisher = correctOrder ? ingredients[1] : ingredients[0], intermediateBooze = correctOrder ? ingredients[0] : ingredients[1];
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
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  if (fillBoozeTrees(levelOneAC, levelTwoAC), relevantSkill === "SHC" && fillBoozeTrees(levelOneSHC, levelTwoSHC), !craftIntermediaries()) {
    if (!getAllDrinks() && drinkSkill === "both" && (relevantSkill = "AC", getAllDrinks()), finalCombination.length === 0)
      return (0, import_kolmafia.print)("You do not have the resources to craft any " + (drinkSkill === "both" ? "AC or SHC" : relevantSkill) + " drinks.");
    finalCombination.length < numberOfDrinksRequested && (0, import_kolmafia.print)("You only have sufficient resources to craft " + finalCombination.length.toString() + " drink" + (finalCombination.length === 1 ? "" : "s. Proceeding..."));
    var _iterator8 = _createForOfIteratorHelper(finalCombination), _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
        var drink = _step8.value;
        addToDo(drink, toCraft);
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    var _iterator9 = _createForOfIteratorHelper(finalItemsToBuy), _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
        var garnish = _step9.value;
        addToDo(garnish, toBuy);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
    (canBuy || toBuy.length === 1 && toBuy[0][0] === "soda water") && !finalBuy() || finalCraft();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
