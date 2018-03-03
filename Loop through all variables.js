//use this to set all variables read only
g_form.setVariablesReadOnly(true);

try {  
	var allVariables = document.getElementById('variable_map').getElementsByTagName('item');  
	for(var i = 0; i < allVariables.length; i++){
		var item = allVariables[i];  
		//g_form.setReadOnly('variables.' + item.getAttribute('qname').toString(),true);  
	}
} catch(err) {} 