//Before update Business rule needs to have an order over 1000 so that it runs after of Assignment rules

if(current.assignment_group && current.assignment_group.changes() && current.assigned_to.nil() && ifScript()){
	var rota = new OnCallRotation();
	rota.who(current.assignment_group);
	var currentOnCall = rota.getPrimaryUser();

	//Only assign if there is someone is on_call & assigned_to is empty
	if(currentOnCall) { 
		current.assigned_to = currentOnCall;
		current.comments = gs.getMessage("Incident assigned based on current on-call resource");
		//current.update();
	}
}

function ifScript() {
	var rota = new SNC.OnCallRotation();
	var gdt  = new GlideDateTime();
	var escalationPlan = rota.getEscalationPlan(current.assignment_group, gdt);
	
    if (JSUtil.nil(rota) || JSUtil.nil(rota.getCurrentRotaID())) {
        return false;
    }
    return true;
}