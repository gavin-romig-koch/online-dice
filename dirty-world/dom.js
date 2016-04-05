function DeleteAllChildren(parent) {
  while (parent.childNodes.length > 0)
    parent.removeChild(parent.childNodes[0]);
}
function AppendChild(parent,newchild) {
  parent.appendChild(newchild);
}
function ReplaceAllChildren(parent,newchild) {
  DeleteAllChildren(parent);
  AppendChild(parent,newchild);
  }
function MakeText(text) {
    return document.createTextNode(text);
}
function MakeLabel(text) {
  var l = document.createElement("span");
  l.setAttribute("class","label");
  AppendChild(l,MakeText(text));
  return l;
}

function MakeOutput(text) {
  var l = document.createElement("span");
  l.setAttribute("class","output");
  if (text) AppendChild(l,MakeText(text));
  return l;
}
function MakeButton(label,onclick) {
  var l = document.createElement("mybutton");
  l.setAttribute("label",label);
  if (onclick) l.setAttribute("onclick",onclick);
  return l;
}
function MakeInputOnChange(value,onchange) {
    var i = document.createElement("input");
    i.setAttribute("type","text");
    if (value) i.setAttribute("value",value);
    if (onchange) i.setAttribute("onchange",onchange);
    return i;
}
function MakeIdedInputOnChange(id,value,onchange) {
    var i = document.createElement("input");
    i.setAttribute("type","text");
    if (id) i.setAttribute("id",id);
    if (value) i.setAttribute("value",value);
    if (onchange) i.setAttribute("onchange",onchange);
    return i;
}
function MakeButtonOnClick(value,onclick) {
    var i = document.createElement("input");
    i.setAttribute("type","button");
    if (value) i.setAttribute("value",value);
    if (onclick) i.setAttribute("onclick",onclick);
    return i;
}
function MakeDiv() {
    var div = document.createElement("div");
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (element, index, array) {
        AppendChild(div, element);
    });
    return div; 
}
function MakeSpan() {
    var span = document.createElement("span");
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (element, index, array) {
        AppendChild(span, element);
    });
    return span; 
}
function MakeBr() {
    return document.createElement("br");
}
function ValueOf( id )
{
    var node = document.getElementById(id);
    if (node)
	return node.value;
    else
	return 0;
}
function SetValue(id, value)
{
    var node = document.getElementById(id);
    if (node)
	node.value = value;
    else
	alert("SetValue, no such id: " + id);
}
function AsInt(s)
{
    if (s)
	return parseInt(s,10);
    else
        alert ("attempt to convert empty string to int");
}
