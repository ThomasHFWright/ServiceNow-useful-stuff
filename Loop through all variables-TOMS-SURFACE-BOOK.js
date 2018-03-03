//use this to set all variables read only
g_form.setVariablesReadOnly(true);

var nm = g_form.nameMap;
for (var i = 0; i < nm.length; i++) {
console.log(nm[i].prettyName);
}