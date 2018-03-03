function customSetLabelOf(fieldName,value){
	if(!value){
		value = '';
	}
	try{
		var labelElement = $('label_' +  g_form.getControl(fieldName).id);
		labelElement.select('label').each(function(elmt) {
			var innerlabelElement = elmt.getElementsByClassName('sn-tooltip-basic ');
			for (i=0;i<innerlabelElement.length;i++){
				innerlabelElement[i].innerHTML = value;
			}
		});
		return true;
	}
	catch(e){
		return false;
	}
}