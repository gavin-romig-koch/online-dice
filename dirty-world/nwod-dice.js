function get_random(maxNum) 
{ 
  var ranNum = Math.floor((Math.random() * maxNum) + 1); 
  return ranNum; 
}
function roll_xAgain(numDice,xAgain)
{
   var rolls = new Array(numDice);
   for (i=0; i < numDice; i=i+1)
   {
       rolls[i] = get_random(10)+1;
       if (rolls[i] >= xAgain)
	   numDice = numDice + 1;
   }
   return rolls;
}
function roll_nwod(name,pool,xAgain,difficulty)
{
    var resultString = "";
    var result = 0;
    if (pool == 0)
	{
	    var rolls = roll_xAgain(1,xAgain);
	    var i;

	    for (i=0; i < rolls.length; i = i + 1)
		if (rolls[i] >= difficulty) 
		    result = result + 1;

	    resultString = name + " (Chance Roll): " + rolls + " ";

	    if (rolls[0] == 1)
		resultString += "Dramatic Failure";
	    else if (result >= 5)
		resultString += "Dramatic Success";
	    else if (result == 0)
		resultString += "Failure";
            else
		resultString += "Success";
	}
    else
	{
	    var rolls = roll_xAgain(pool,xAgain);
	    var i;

	    for (i=0; i < rolls.length; i = i + 1)
		if (rolls[i] >= difficulty) 
		    result = result + 1;

	    resultString = name + 
		" (dice: " + pool + "): " + rolls + " = " + result + " ";

	    if (result >= 5)
		resultString += "Dramatic Success";
	    else if (result == 0)
		resultString += "Failure";
            else
		resultString += "Success";
	}
    return [result, resultString];
}
function nwod_button_click(theButton)
{
    var name = theButton.getAttribute("value");
    var pool = parseInt(document.getElementById("DicePool").value);
    var xAgain = parseInt(document.getElementById("xAgain").value);
    var difficulty = parseInt(document.getElementById("Difficulty").value);
    var resultPair = roll_nwod(name,pool,xAgain,difficulty);
    ReplaceAllChildren($('rollresult'),MakeText(resultPair[1]));
}
function ladder(level) 
{
    if (level >= 8) 
	return "Legendary";
    else if (level == 7) 
	return "Epic";
    else if (level == 6)
	return "Fantastic";
    else if (level == 5) 
	return "Superb";
    else if (level == 4) 
	return "Great";
    else if (level == 3)
	return "Good";
    else if (level == 2)
	return "Fair";
    else if (level == 1) 
	return "Average";
    else if (level == 0)
	return "Mediocre";
    else if (level == -1) 
	return "Poor";
    else if (level <= -2)
	return "Terrible";
    else
	return "Unknown";
}
function houses_roll(ndice)
{
    var rolls = new Array(ndice);
    for (i=0; i < ndice; i=i+1)
	    rolls[i] = get_random(6);
    
    result = 0;
    for (i=0; i < rolls.length; i = i + 1)
	    result += rolls[i];
    
    resultString = ((result < 10) ? "failure" : "success" ) + " (" + result + ") = [" + rolls + "]";
    return [result, resultString];
}
function houses_button_click(theButton)
{
    var pool = parseInt(document.getElementById("Pool").value);
    var wagers = parseInt(document.getElementById("Wagers").value);
    ReplaceAllChildren($('rollresult'),MakeText(houses_roll(pool-wagers)[1]));
}
function pairs_to_string(array) {
    var result = "";
    for (var each = 0; each < array.length; each += 1) {
        result += " " + array[each][0] + "x" + array[each][1];
    }
    return result;
}
function dirty_world_roll(ndice)
{
    var rolls = Array(ndice);
    for (var i=0; i < ndice; i=i+1) {
	rolls[i] = get_random(10);
    }
    
    // counts[1:10] is the number of dice that came up that value
    //   for a given height H  counts[H] will tell you width
    //      note that counts[H] could be 0 or 1 which is not a real set
    var counts = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    for (var i=0; i < ndice; i=i+1) {
	roll = get_random(10);
        counts[rolls[i]] += 1;
    }

    result = [];
    for (var H=10; H > 0; H=H-1) {
        if (counts[H] > 1) {
            result.push( [counts[H], H] );
        }
    }

    resultString = ((result.length > 0) ? "success" : "failure" ) +
        pairs_to_string(result) + "    " +
        "(" + rolls.toString() + ")" +
        " pool " + ndice;
    return [result, resultString];
}
function dirty_world_button_click(theButton)
{
    var identity = parseInt(document.getElementById("Identity").value);
    var quality = parseInt(document.getElementById("Quality").value);
    var bonus = parseInt(document.getElementById("Bonus").value);
    var pool = identity + quality + bonus;
    ReplaceAllChildren($('rollresult'),MakeText(dirty_world_roll(pool)[1]));
}





function start()
{
}
