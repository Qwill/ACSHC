# ACSHC v1.0.0

This is a Kingdom of Loathing Mafia script for automating Advanced Cocktailcrafting and Superhuman Cocktailcrafting. It is designed for hardcore runs when you have limited ingredients and want to maximize the number of drinks you can craft. It will work outside of hardcore, but it will be slower and you probably have better options.

Input a number of drinks between one and ten, e.g. `ACSHC 5`. Instead of inputting a number, you can instead use `fill` to calculate how many drinks you can have without exceeding your limit. `overfill` will do the same, but adds one to the result for a nightcap.

ACSHC will by default choose AC or SHC drinks depending on whether you meet the requirements for SHC (Avatar of Sneaky Pete is supported as well), check all possible combinations of drinks you can make (including buyable garnishes if you have access to the Hippy Store), and craft the maximum number possible up to your requested quantity. You can also run a simulation to see the output without actually buying or crafting anything by adding "sim" to the command, e.g. `ACSHC 5 sim`.

You can force the script to use a particular skill by adding `ac`, `shc`, or `both`. The `both` option crafts as many SHC drinks as possible up to your requested quantity, then crafts AC drinks if it has not met your request.

Some paths prohibit certain AC/SHC drinks. If you are in a "Bees Hate You", "G-Lover", or "License to Adventure" path, the script will only consider possibilities you can actually drink. If for some reason you want to prevent this behavior, add the parameter `override`.

Parameters do not have to be in any particular order. `ACSHC fill ac sim` is equivalent to `ACSHC ac sim fill`. They are also not case sensitive.

To install the script, type `git checkout Qwill/ACSHC release` into Mafia's CLI.

If your version is lower than one listed above, please update with `git update Qwill-ACSHC-release`.

Kmail any issues, questions, or requests to Kuile (#3541381)