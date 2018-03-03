(function executeRule(current, previous /*null when async*/) {

	var set = new GlideappVariablePoolQuestionSet();
	set.setRequestID(current.request_item.sys_id);
	set.load();
	var vs = set.getFlatQuestions();
	var work_notes = '';
	for (var i = 0; i < vs.size(); i++) {
		var currentVar = vs.get(i);
		if(current.variables[currentVar.name].changes()){
			if(work_notes){work_notes+='\n';}
			work_notes += currentVar.getLabel()+': '+currentVar.getDisplayValue();
		}
	}
	if(work_notes){
		var ritm = new GlideRecord('sc_req_item');
		if(ritm.get(current.request_item)){
			ritm.work_notes = 'Variables updated:\n' + work_notes;
			ritm.update();
		}
	}

})(current, previous);