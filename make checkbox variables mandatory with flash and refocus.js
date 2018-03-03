function onSubmit(){
	//Set the mandatory checkbox variable names and total mandatory count here
	var mandatoryVars = 'ssoft_quote,ssoft_purchase_on_behalf_of';
	//Name of the checkbox label variable
	var labelName = 'ssoft_label_checkbox';
	var mandatoryCount = 1;

	var passed = forceMandatoryCheckboxes(mandatoryVars, mandatoryCount);
	if(!passed){
		//Abort the submit
		alert('You must select at least ' + mandatoryCount + ' option.');
		var nameMap = g_form.resolveNameMap(labelName);
		g_form.flash('label_'+nameMap,'#FFFACD', -2);
		g_form.showFieldMsg(labelName,'test');
		g_form.hideFieldMsg(labelName);
		return false;
	}


	function forceMandatoryCheckboxes(mandatory, count){
		//Split the mandatory variable names into an array
		mandatory = mandatory.split(',');
		var answer = false;
		var varFound = false;
		var numTrue = 0;
		//Check each variable in the array
		for(x=0;x<mandatory.length;x++){
			//Check to see if variable exists
			if(g_form.getControl(mandatory[x])){
				varFound = true;
				g_form.getControl(mandatory[x]).focus();
				//Check to see if variable is set to 'true'
				if(g_form.getValue(mandatory[x]) == 'true'){
					numTrue ++;
					//Exit the loop if we have reached required number of 'true'
					if(numTrue >= count){
						answer = true;
						break;
					}
				}
			}
		}
		//If we didn't find any of the variables allow the submit
		if(varFound == false){
			answer = true;
		}
		//Return true or false
		return answer;
	}
}