InnoviseUpdateTaskSLAs();

function InnoviseUpdateTaskSLAs(){
	//Edit query here to define which Task SLAs to update. Leave as is to update all.
	var gr = new GlideRecord('task_sla');
	var qc = gr.addQuery('stage','in_progress');
	
	//Edit line below to specify a particular table to update SLAs for, e.g. incident or change_request
	//gr.addQuery('task.sys_class_name','incident');
	
	//More conditions if needed, e.g. only update Task SLAs what are due today
	//gr.addQuery('task.priority','1');
	
	//Uncomment below to only update Task SLAs that are due to breach today
	//gs.addEncodedQuery('planned_end_timeONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
	
	gr.orderBy('sys_updated_on');
	gr.query();
	while(gr.next()){
		this._runSLACalculation(gr);
	}
}
	
function _runSLACalculation(SLA) {
   //If the SLA has already ended, set now to the end time so the calculation doesn't get messed up
   if (!SLA.end_time.nil())
	  SLACalculatorNG.calculateSLA(SLA, /* skipUpdate */ false, SLA.end_time);
   else
	  SLACalculatorNG.calculateSLA(SLA, /* skupUpdate */ false);
}