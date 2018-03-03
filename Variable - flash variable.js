var varname = 'ssoft_label_checkbox';
var nameMap = g_form.resolveNameMap(varname);
g_form.flash('label_'+nameMap,"#FFFACD", -2);

setTimeout(function(){
	var refocus = g_form.getControl(nameMap);
	refocus.focus();
},0);

g_form.showFieldMsg("ssoft_label_checkbox",'test')
g_form.hideFieldMsg("ssoft_label_checkbox");