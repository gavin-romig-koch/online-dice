

function MakeItem(left_name, rite_name, value_kind) {
    left = MakeDiv(
        MakeButtonOnClick(left_name, "SetValue('" + value_kind + "',ValueOf('" + left_name + "'))"),
        MakeBr(),
        MakeSpan(
            MakeButtonOnClick("-", "bump_down('" + left_name + "','" + rite_name + "')"),
            MakeIdedInputOnChange(left_name, "0", null),
            MakeButtonOnClick("+", "bump_up('" + left_name + "','" + rite_name + "')"),
            MakeButtonOnClick(">", "slide('" + left_name + "','" + rite_name + "')")
        )
    );
    rite = MakeDiv(
        MakeSpan(
            MakeButtonOnClick("<", "slide('" + rite_name + "','" + left_name + "')"),
            MakeButtonOnClick("+", "bump_up('" + rite_name + "','" + left_name + "')"),
            MakeIdedInputOnChange(rite_name, "0", null),
            MakeButtonOnClick("-", "bump_down('" + rite_name + "','" + left_name + "')")
        ),
        MakeBr(),
        MakeButtonOnClick(rite_name, "SetValue('" + value_kind + "',ValueOf('" + rite_name + "'))")
    );
    left.setAttribute("class","left");
    rite.setAttribute("class","right");
    return MakeDiv(left, rite);
}

function MakeItem2(left_name, rite_name, value_kind) {
    left = MakeDiv(
        MakeButtonOnClick(left_name, "SetValue('" + value_kind + "',ValueOf('" + left_name + "'))"),
        MakeButtonOnClick("-", "bump_down('" + left_name + "','" + rite_name + "')"),
        MakeIdedInputOnChange(left_name, "0", null),
        MakeButtonOnClick("+", "bump_up('" + left_name + "','" + rite_name + "')"),
        MakeButtonOnClick(">", "slide('" + left_name + "','" + rite_name + "')")
    );
    left.setAttribute("class","left");
    rite = MakeDiv(
        MakeButtonOnClick("<", "slide('" + rite_name + "','" + left_name + "')"),
        MakeButtonOnClick("+", "bump_up('" + rite_name + "','" + left_name + "')"),
        MakeIdedInputOnChange(rite_name, "0", null),
        MakeButtonOnClick("-", "bump_down('" + rite_name + "','" + left_name + "')"),
        MakeButtonOnClick(rite_name, "SetValue('" + value_kind + "',ValueOf('" + rite_name + "'))")
    );
    rite.setAttribute("class","right");
    return MakeDiv(left, rite);
}

function start() {
    ReplaceAllChildren(
        $("addhere"),
        MakeDiv(
            MakeItem("Generosity","Selfishness","Quality"), 
            MakeItem2("PATIENCE","CUNNING","Identity"),
            MakeItem("Demonstration","Observation","Quality"),
            MakeItem("Courage","Wrath","Quality"), 
            MakeItem2("VIGOR","GRACE","Identity"),
            MakeItem("Endurance","Defiance","Quality"),
            MakeItem("Purity","Corruption","Quality"), 
            MakeItem2("UNDERSTANDING","PERSUASION","Identity"),
            MakeItem("Honesty","Deceit","Quality")
        )
    ); 
}

function bump_up(this_name, other_name) {
    this_value = AsInt(ValueOf(this_name));
    other_value = AsInt(ValueOf(other_name));
    if (this_value < 5) {
        SetValue(this_name, this_value + 1);
        if (other_value > (7 - (this_value + 1))) {
            SetValue(other_name, 7 - (this_value + 1));
        }
    }
}
function bump_down(this_name, other_name) {
    this_value = AsInt(ValueOf(this_name));
    other_value = AsInt(ValueOf(other_name));
    if (this_value > 0) {
        SetValue(this_name, this_value - 1);
    }
}
function slide(this_name, other_name) {
    this_value = AsInt(ValueOf(this_name));
    other_value = AsInt(ValueOf(other_name));
    if (this_value > 0 && other_value < 5) {
        SetValue(this_name, this_value - 1);
        SetValue(other_name, other_value + 1);
        if (this_value > (7 - (other_value + 1))) {
            SetValue(this_name, 7 - (other_value + 1));
        }
    }
}
