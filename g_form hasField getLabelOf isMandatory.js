//these are only necessary on ritm/catalog task pages. Not Catalog item page
alert(g_form.hasField(getVarID('my_comp_task_dell_additional_information')));

alert(g_form.getLabelOf(getVarID('my_comp_task_dell_additional_information')))

alert(g_form.isMandatory(getVarID('my_comp_task_disposal_type')))

alert(gel('element.'+getVarID('my_comp_task_disposal_type')).style["display"]); //isVisible

function getVarID(variableName) {  
	for (var k in g_form.nameMap) {     
		if (g_form.nameMap[k].prettyName == variableName) {  
			return 'ni.VE' + g_form.nameMap[k].realName;  
		}  
	}  
}


//use case to make a variable mandatory only if it is visible on the form, alert user if not
function checkVariable(variableName){
	if(g_form.hasField(getVarID(variableName)) && checkVisibility(variableName)){ //if variable is on form
		g_form.setMandatory(variableName,true);
		if(g_form.getValue(variableName) == ''){
			emptyVariables.push(g_form.getLabelOf(getVarID(variableName)));
		}
	}
}
//Need to get the "real name" of the variable for certain functions, which is of the format ni.VEsys_id where the sys_id is not the sys_id of the variable so needs to be lookup up
function getVarID(variableName) {  
	for (var k in g_form.nameMap) {     
		if (g_form.nameMap[k].prettyName == variableName) {  
			return 'ni.VE' + g_form.nameMap[k].realName;  
		}  
	}  
}
function checkVisibility(variableName) {
	try{
		var display = gel('element.'+getVarID(variableName)).style["display"];
		if(display == "none"){
			return false;
		}
		else return true;
	}
	catch(e){
		return false; //not on the form
	}
}