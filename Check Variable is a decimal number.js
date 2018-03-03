function onChange(control, oldValue, newValue, isLoading) 
{
	if (isLoading || newValue == '') {
	  return;
	}

	var variableLabel = g_form.getLabelOf(control.name).trim();
	var variableName = control.name;
	var regExp = new RegExp("^[0-9]+(\.[0-9]+)?$");
	
	if (!regExp.test(newValue)) {
		alert('"'+variableLabel+'" should contain a positive number.\nE.g. 1, 1.5, 2, 2.53, 3, ...  (and so on).');
		g_form.setValue(variableName, '');
	}
}