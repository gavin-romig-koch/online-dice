
get_random = require("../dirty-world/nwod-dice.js").get_random


function remove_element(arr, index) {
    return arr.splice(index, 1)[0];
}

function remove_just_enough(sorted_arr, still_needed) {
    //console.log(sorted_arr, sorted_arr.length, still_needed);
    for (var i = 0; i < (sorted_arr.length - 1); i += 1) {
        //console.log(i, sorted_arr[i], still_needed);
        if (sorted_arr[i+1] < still_needed) {
            return remove_element(sorted_arr, i);
        }
    }
    return remove_element(sorted_arr, sorted_arr.length - 1);
}

function reverse_sort(arr) {
    arr.sort(function(a, b) {
        return b - a;
    });
}

function nested_array_as_string(arr) {
    var result = " [";
    for (var i = 0; i < arr.length; i += 1) {
        result += "(" + arr[i].toString() + ")";
    }
    result += "]";
    return result;
}
function seventh_sea_roll(ndice)
{
    var rolls = Array(ndice);
    for (var i=0; i < rolls.length; i=i+1) {
	rolls[i] = get_random(10);
    }

    return seventh_sea_results_for(rolls);
}
function seventh_sea_results_for(rolls) {
    var sorted_rolls = Array(rolls.length);
    for (var i=0; i < rolls.length; i=i+1) {
        sorted_rolls[i] = rolls[i];
    }

    reverse_sort(sorted_rolls);

    still_needed = 10;
    current_set = [];
    all_sets = [];

    while (sorted_rolls.length > 0) {
        val = remove_just_enough(sorted_rolls, still_needed);
        current_set.push(val);
        still_needed -= val;
        if (still_needed <= 0) {
            all_sets.push(current_set);
            still_needed = 10;
            current_set = [];
        }
    }

    result = all_sets.length;
    resultString = ((result > 0) ? "success:" : "failure:") +
        " " + result + ((result == 1) ? "raise" : " raises") +
        "    pool " + rolls.length +
        " (" + rolls.toString() + ")" +
        " " + nested_array_as_string(all_sets);

    return [result, resultString];
}
module.exports.seventh_sea_roll = seventh_sea_roll;

function seventh_sea_roll_button_click(theButton)
{
    var trait = parseInt(document.getElementById("Trait").value);
    var skill = parseInt(document.getElementById("Skill").value);
    var bonus = parseInt(document.getElementById("Bonus").value);
    var pool = trait + skill + bonus;
    ReplaceAllChildren($('rollresult'),MakeText(seventh_sea_roll(pool)[1]));
}

function start() {
}
