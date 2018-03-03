function findGroupMembers(group) {
	//return everything if the assigned_to value is empty
	if(!group){
		return;
	}

	var groupID = new GlideRecord('sys_user_group');
	groupID.addQuery('name',group);
	groupID.query();

	if(groupID.next()){
		var grp = new GlideRecord('sys_user_grmember');
		grp.addQuery('group',groupID.sys_id);
		grp.query();
		var gp;
		var x=0;
		while(grp.next()) {
			if(grp.user){
				gp += ','+ grp.user;
			}
		}
		// return Users which are in the specified group
		return 'sys_idIN' + gp;
	}
}