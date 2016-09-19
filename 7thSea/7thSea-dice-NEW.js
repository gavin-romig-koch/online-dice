#!/bin/node

get_random = require("../dirty-world/nwod-dice.js").get_random

Array.prototype.remove_element = function (index) {
    return this.splice(index, 1)[0];
}
Array.prototype.get_element = function (index) {
    return this[index];
}
Array.prototype.sum = function () {
    return this.reduce(function (prev, curr) { return prev + curr; }, 0);
}
Array.prototype.prepend = function (value) {
    this.unshift(value);
    return this;
}
Array.prototype.copy = function () {
    return Array.from(this);
}

function old_remove_just_enough(sorted_arr, still_needed) {
    //console.log(sorted_arr, sorted_arr.length, still_needed);
    for (var i = 0; i < (sorted_arr.length - 1); i += 1) {
        //console.log(i, sorted_arr[i], still_needed);
        if (sorted_arr[i+1] < still_needed) {
            return remove_element(sorted_arr, i);
        }
    }
    return sorted_arr.remove_element(sorted_arr.length - 1);
}

function find_set(rolls, next_index, set_size, set_total) {
    // return a set
    //     the returned set must be of set_size
    //     and have a total of set_total
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
module.exports.seventh_sea_roll = seventh_sea_roll;


function make_reverse_sorted_array(rolls) {
    var sorted_rolls = Array(rolls.length);
    for (var i=0; i < rolls.length; i=i+1) {
        sorted_rolls[i] = rolls.get_element(i);
    }

    reverse_sort(sorted_rolls);
    return sorted_rolls;
}

function make_roll_sorter(rolls) {
    var sorted_rolls = make_reverse_sorted_array(rolls);
    return Object.create({
        find_smallest_set: function () {
            var indirect_set = make_indirect_set(this);
            return indirect_set.next(0);
        },
        remove_element: function(i) {
            var value = this.sorted_rolls.remove_element(i);
            this.sum -= value;
            return value;
        }            
    }, {
        sum: { value: sorted_rolls.sum(), configurable: true, enumerable: true, writable: true },
        sorted_rolls: { value: sorted_rolls, configurable: true, enumerable: true, writable: true },
    });
}
function old_get_all_sets(rolls) {
    var sorter = make_roll_sorter(rolls)

    all_sets = [];

    while (sorter.sum >= 10) {
        //console.log("remaining sum: " + sorter.sum);
        //console.log(sorter);
        //console.log(all_sets);
        var indirect_set = sorter.find_smallest_set();
        all_sets.push(indirect_set.get_real());
    }

    return all_sets;
}
function get_all_sets(rolls) {
    var sets = [];

    for (var total = 10; total <= rolls.sum(); total++) {
        for (var size = 1; size <= rolls.length; size++) {
            for (var new_set = find_set(rolls, 0, size, total);
                 new_set != null;
                 new_set = find_set(rolls, 0, size, total)) {
                sets.push(new_set);
            }
        }
    }
    return sets;
}
function make_indirect_set(sorter) {
    return Object.create({
        get_real : function () {
            var set = [];
            while (!this.empty()) {
                set.push(this.remove_last());
            }
            //console.log("after get_real:");
            //console.log(this);
            //console.log(set);
            return set;
        },
        empty: function () {
            return this.indirect_rolls.length == 0;
        },
        remove_last: function () {
            return this.remove_element(this.indirect_rolls.length-1);
        },
        remove_element: function (index) {
            var sorter_index = this.indirect_rolls.remove_element(index);
            var die = this.sorter.remove_element(sorter_index);
            this.sum -= die;
            return die;
        },
        push: function(next_index) {
            this.indirect_rolls.push(next_index);
            this.sum += this.sorter.sorted_rolls.get_element(next_index);
        },
        pop: function() {
            var popped_index = this.indirect_rolls.pop();
            this.sum -= this.sorter.sorted_rolls.get_element(popped_index);
        },
        new_sum: function(next_index) {
            return this.sum
                - (this.indirect_rolls.length <= 0 ? 0 : this.sorter.sorted_rolls.get_element(this.indirect_rolls.get_element(this.indirect_rolls.length-1)))
                + this.sorter.sorted_rolls.get_element(next_index);
        },
        next: function (next_index) {
            console.log("next: " + next_index + " length: " + this.sorter.sorted_rolls.length);
            console.log(this);
            if (next_index >= this.sorter.sorted_rolls.length) {
                return this;
            } else {
                var new_sum = this.new_sum(next_index);
                console.log("new_sum: " + new_sum + " sum: " + this.sum);
                while (10 <= new_sum && new_sum < this.sum) {
                    console.log("pop");
                    this.pop();
                    new_sum = this.new_sum(next_index);
                    console.log("new_sum: " + new_sum + " sum: " + this.sum);
                }
                console.log("done new_sum: " + new_sum + " sum: " + this.sum);
                if (this.sum < 10 || (10 <= new_sum && new_sum < this.sum)) {
                    console.log("push");
                    this.push(next_index);
                }
                return this.next(next_index+1);
            }
        },
    }, {
        sorter: { value: sorter, configurable: true, enumerable: true, writable: true },
        indirect_rolls:  { value: [], configurable: true, enumerable: true, writable: true },
        sum:  { value: 0, configurable: true, enumerable: true, writable: true },
    });
}
function seventh_sea_results_for(rolls) {

    var original_rolls = rolls.copy();
    all_sets = get_all_sets(rolls);
    result = all_sets.length;
    resultString = ((result > 0) ? "success:" : "failure:") +
        " " + result + " " + ((result == 1) ? "raise" : "raises") +
        "    pool " + original_rolls.length +
        " (" + original_rolls.toString() + ")" +
        " " + nested_array_as_string(all_sets) +
        " remains (" + rolls + ")";

    return [result, resultString];
}
function old_seventh_sea_results_for(rolls) {
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


if (false) {
//10 1 2 7 6 4 

//10 7 6 4 2 1

//10 [7 4]  [6 2 1]

//7 5 6 6 2 7 1 3 7 [73 75 76]

    //    rolls = [3,1,8,2,3,10,6,4,2,7];
    //    rolls = [7,6,10,4,2,1];
    for (var count = 0; count <= 20; count ++) {
        rolls = seventh_sea_roll_raw(count);
        sets = [];
        if (true) {
            console.log();
            console.log();
            console.log();
            console.log(rolls);
            rolls_count = rolls.length;
            console.log(rolls_count);
            for (var total = 10; total <= rolls.sum(); total++) {
                for (var size = 1; size <= rolls.length; size++) {
                    for (var new_set = find_set(rolls, 0, size, total);
                         new_set != null;
                         new_set = find_set(rolls, 0, size, total)) {
                        sets.push(new_set);
                    }
                }
            }
            console.log(sets);
            console.log(rolls);
            new_count = rolls.length + sets.map(function (elem) { return elem.length; }).sum();
            console.log(new_count);        
        } else {
            console.log(seventh_sea_results_for(rolls));
        }
    }
} else {
    for (var count = 0; count <= 20; count++) {
        console.log(seventh_sea_roll(count));
    }
}
    

