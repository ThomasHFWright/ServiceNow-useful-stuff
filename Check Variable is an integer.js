function onChange(control, oldValue, newValue, isLoading) 
{
	if (isLoading || newValue == '') {
	  return;
	}
	
	var variableLabel = g_form.getLabelOf(control.name).trim();
	var variableName = control.name;
	var regExp = new RegExp(/^[1-9]\d*$/);
	
	if (!regExp.test(newValue)) {
		alert('"'+variableLabel+'" should contain a whole number. 1, 2, 3, ... (and so on)');
		g_form.setValue(variableName, '');
	}
}