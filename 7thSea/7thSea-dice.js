//
// This is copied from 'reduce' polyfill in the Mozilla documentation
// The reduce provided by firefox seems really broken.
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.jabba) {
    //console.log("defining jabba");
    Array.prototype.jabba = function(callback /*, initialValue*/) {
    'use strict';
    if (this === null) {
      throw new TypeError('Array.prototype.jabba called on null or undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length == 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in t)) {
        k++; 
      }
      if (k >= len) {
        throw new TypeError('Jabba of empty array with no initial value');
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}
function get_random(maxNum) 
{ 
  var ranNum = Math.floor((Math.random() * maxNum) + 1); 
  return ranNum; 
}
function check(me) {
    if (me) throw new TypeError(Array.prototype.remove_element + " already exists");
}
check(Array.prototype.remove_element);
Array.prototype.remove_element = function (index) {
    return this.splice(index, 1)[0];
}
check(Array.prototype.get_element);
Array.prototype.get_element = function (index) {
    return this[index];
}
check(Array.prototype.sum);
Array.prototype.sum = function () {
    return this.jabba(function (prev, curr) { return prev + curr; }, 0);
}
check(Array.prototype.prepend);
Array.prototype.prepend = function (value) {
    this.unshift(value);
    return this;
}
check(Array.prototype.copy);
Array.prototype.copy = function () {
    return Array.from(this);
}
function find_set(rolls, next_index, set_size, set_total) {
    // return a set
    //     the returned set must be of set_size
    //     and have a total of set_total
    //console.log("find set: " + rolls + " " + next_index + " " + set_size + " " + set_total);
    if (next_index >= rolls.length) {
        if (set_size == 0 && set_total == 0) {
            return [];
        } else {
            return null;
        }
    }
    
    if (set_size == 0) {
        if (set_total == 0) {
            return [];
        } else {
            return null;
        }
    }

    if (set_total == 0) {
        return null;
    }

    if (rolls[next_index] <= set_total) {
        var xx = find_set(rolls, next_index+1, set_size-1, set_total-rolls[next_index]);
        if (xx != null) {
            return xx.prepend(rolls.remove_element(next_index));
        }
    }
    
    return find_set(rolls, next_index+1, set_size, set_total);
}
function nested_array_as_string(arr) {
    var result = " [";
    for (var i = 0; i < arr.length; i += 1) {
        result += "(" + arr[i].toString() + ")";
    }
    result += "]";
    return result;
}
function seventh_sea_roll_raw(ndice) {
    var rolls = Array(ndice);
    for (var i=0; i < rolls.length; i=i+1) {
	rolls[i] = get_random(10);
    }
    return rolls;
}
function seventh_sea_roll(ndice) {
    return seventh_sea_results_for(seventh_sea_roll_raw(ndice));
}
//module.exports.seventh_sea_roll = seventh_sea_roll;
function get_all_sets(rolls) {
    var sets = [];
    //console.log("get_all_sets: " + rolls);
    //console.log("  sum: " + rolls.sum());
    for (var total = 10; total <= rolls.sum(); total++) {
        for (var size = 1; size <= rolls.length; size++) {
            //console.log("get_all_sets: total: " + total + " size: " + size);
            for (var new_set = find_set(rolls, 0, size, total);
                 new_set != null;
                 new_set = find_set(rolls, 0, size, total)) {
                sets.push(new_set);
            }
            //console.log("get_all_sets: " + rolls);
        }
    }
    //console.log("get_all_sets: " + rolls);
    return sets;
}
function seventh_sea_results_for(rolls) {
    //console.log("seventh_sea_results_for: " + rolls);
    var original_rolls = rolls.copy();
    //console.log("seventh_sea_results_for: " + rolls);
    //console.log("seventh_sea_results_for: " + original_rolls);
    var all_sets = get_all_sets(rolls);
    var result = all_sets.length;
    resultString = ((result > 0) ? "success:" : "failure:") +
        " " + result + " " + ((result == 1) ? "raise" : "raises") +
        " " + nested_array_as_string(all_sets) +
        ((rolls.length > 0) ? " unused (" + rolls + ")" : "") +
        " pool " + original_rolls.length +
        " (" + original_rolls.toString() + ")" +
        "";

    return [result, resultString];
}
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
