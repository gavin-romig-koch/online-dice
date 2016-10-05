function get_random(maxNum) 
{ 
  var ranNum = Math.floor(Math.random() * maxNum); 
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
function bernd_roll(skill,difficulty)
{
    var ndice = 4;
    var rolls = new Array(4);
    for (i=0; i < 4; i=i+1)
	rolls[i] = get_random(3)-1;
    
    result = 0;
    for (i=0; i < rolls.length; i = i + 1)
	result += rolls[i];

    shifts = result + skill - difficulty;
    
    resultString = ladder(shifts) + "(" + shifts + ") = " + result + " + " + skill + " - " + difficulty + " = [" + rolls + "]";
    return [shifts, resultString];
}
function bernd_button_click(theButton)
{
    var difficulty = parseInt(document.getElementById("Difficulty").value);
    var skill = parseInt(document.getElementById("Skill").value);
    ReplaceAllChildren($('rollresult'),MakeText(bernd_roll(skill,difficulty)[1]));
}
function start()
{
}
