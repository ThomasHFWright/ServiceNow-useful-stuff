function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}
	var variable_label = g_form.getLabelOf(control.name);
	var variable_name = control.name;
	var date_format = g_user_date_time_format; //g_user_date_time_format for date/time variable
	var dt = getDateFromFormat(newValue, date_format); 
	if (dt == 0) {  
	          alert('The '+variable_label+' entered is not recognised.\nSelect a valid date by clicking the calendar icon to the right of '+variable_label+', or enter a date in the '+date_format+' format.');
	g_form.setValue(variable_name,''); 
	}  
	else{
		var rightNow = new Date();  
		if (dt < rightNow) {
			alert('The "'+variable_label+'" must be set in the future.');
			g_form.setValue(variable_name,'');
		} 
	}
}

function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}
	var variable_label = g_form.getLabelOf('due_date');
	var date_format = g_user_date_time_format; //g_user_date_time_format for date/time variable
	var dt = getDateFromFormat(newValue, date_format); 
	if (dt == 0) { 
		g_form.setValue('due_date',''); 
		var message1 = variable_label + ' ' + getMessage('entered in the incorrect format. Enter in the following format:') + ' ' + date_format;
		g_form.showFieldMsg('due_date', message1 ,'error');
	}  
	else{
		var rightNow = new Date();  
		if (dt < rightNow) {
			g_form.setValue('due_date','');
			var message2 = variable_label + ' ' + 'must be set in the future.';
			g_form.showFieldMsg('due_date',message2,'error');
		} 
	}
}