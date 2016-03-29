

function bump_up(this_name, other_name) {
    this_value = AsInt(ValueOf(this_name));
    other_value = AsInt(ValueOf(other_name));
    if (this_value < 5) {
        SetValue(this_name, this_value + 1);
        if (other_value > (7 - this_value)) {
            SetValue(other_name, 7 - this_value);
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
        if (this_value > (7 - other_value)) {
            SetValue(this_name, 7 - other_value);
        }
    }
}
