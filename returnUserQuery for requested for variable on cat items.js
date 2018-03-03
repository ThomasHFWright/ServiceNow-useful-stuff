/*gs.log(returnUserQuery('cb0de41b4f2b220067badefd0210c78b'));
var usergrgr = new GlideRecord('sys_user');
usergrgr.addEncodedQuery(new EGPReturnCatalogItemUsers().returnUserQuery('cb0de41b4f2b220067badefd0210c78b'));
usergrgr.query();
while(usergrgr.next()){
	gs.log(usergrgr.name);
}*/

var EGPReturnCatalogItemUsers = Class.create();
EGPReturnCatalogItemUsers.prototype = {
    initialize: function() {
    },
	
	returnUserQuery: function(cat_item_sysID,skipCompanyCheck,skipDepartmentCheck,skipLocationCheck,skipUserCheck,skipGroupCheck,skipRoleCheck){
		var item = new GlideRecord('sc_cat_item');
		if(item.get(cat_item_sysID)){
			var companies = '';
			var noCompanies = '';
			var departments = '';
			var noDepartments = '';
			var locations = '';
			var noLocations = '';
			var users = '';
			var noUsers = '';
			var groups = '';
			var noGroups = '';
			var roles = '';

			//check company filters
			if(!skipCompanyCheck){
				var cmpAddGr = new GlideRecord('sc_cat_item_company_mtom');
				cmpAddGr.addQuery('sc_cat_item',item.sys_id);
				cmpAddGr.query();
				while(cmpAddGr.next()){
					if(companies){companies += ',';}
					companies += cmpAddGr.sc_avail_company;
				}
				var cmpNoGr = new GlideRecord('sc_cat_item_company_no_mtom');
				cmpNoGr.addQuery('sc_cat_item',item.sys_id);
				cmpNoGr.query();
				while(cmpNoGr.next()){
					if(noCompanies){noCompanies += ',';}
					noCompanies += cmpNoGr.sc_avail_company;
				}
			}

			//check department filters
			if(!skipDepartmentCheck){
				var dptAddGr = new GlideRecord('sc_cat_item_dept_mtom');
				dptAddGr.addQuery('sc_cat_item',item.sys_id);
				dptAddGr.query();
				while(dptAddGr.next()){
					if(departments){departments += ',';}
					departments += dptAddGr.sc_avail_dept;
				}
				var dptNoGr = new GlideRecord('sc_cat_item_dept_no_mtom');
				dptNoGr.addQuery('sc_cat_item',item.sys_id);
				dptNoGr.query();
				while(dptNoGr.next()){
					if(noDepartments){noDepartments += ',';}
					noDepartments += dptNoGr.sc_avail_dept;
				}
			}
			
			//check location filters
			if(!skipLocationCheck){
				var locAddGr = new GlideRecord('sc_cat_item_location_mtom');
				locAddGr.addQuery('sc_cat_item',item.sys_id);
				locAddGr.query();
				while(locAddGr.next()){
					if(locations){locations += ',';}
					locations += locAddGr.sc_avail_location;
				}
				var locNoGr = new GlideRecord('sc_cat_item_location_no_mtom');
				locNoGr.addQuery('sc_cat_item',item.sys_id);
				locNoGr.query();
				while(locNoGr.next()){
					if(noLocations){noLocations += ',';}
					noLocations += locNoGr.sc_avail_location;
				}
			}

			//check user filters
			if(!skipUserCheck){
				var usrAddGr = new GlideRecord('sc_cat_item_user_criteria_mtom');
				usrAddGr.addQuery('sc_cat_item',item.sys_id);
				usrAddGr.query();
				while(usrAddGr.next()){
					if(users){users += ',';}
					users += usrAddGr.sc_avail_user;
				}
				var usrNoGr = new GlideRecord('sc_cat_item_user_criteria_no_mtom');
				usrNoGr.addQuery('sc_cat_item',item.sys_id);
				usrNoGr.query();
				while(usrNoGr.next()){
					if(noUsers){noUsers += ',';}
					noUsers += usrNoGr.sc_avail_user;
				}
			}

			//check group filters
			if(!skipGroupCheck){
				var grpAddGr = new GlideRecord('sc_cat_item_group_mtom');
				grpAddGr.addQuery('sc_cat_item',item.sys_id);
				grpAddGr.query();
				while(grpAddGr.next()){
					if(groups){groups += ',';}
					groups += grpAddGr.sc_avail_group;
				}
				var grpNoGr = new GlideRecord('sc_cat_item_group_no_mtom');
				grpNoGr.addQuery('sc_cat_item',item.sys_id);
				grpNoGr.query();
				while(grpNoGr.next()){
					if(noGroups){noGroups += ',';}
					noGroups += grpNoGr.sc_avail_group;
				}
			}

			//check role filters
			if(!skipRoleCheck && item.roles){
				var roleGr = new GlideRecord('sys_user_role');
				roleGr.addQuery('name','IN',item.roles+',admin');
				roleGr.query();
				while(roleGr.next()){
					if(roles){roles += ',';}
					roles += roleGr.sys_id;
				}
			}


			var query = '';
			if(companies){
				if(query){query+='^';}
				query += 'companyIN'+companies;
			}
			if(noCompanies){
				if(query){query+='^';}
				query += 'companyNOT IN'+noCompanies;
			}
			if(departments){
				if(query){query+='^';}
				query += 'departmentIN'+departments;
			}
			if(noDepartments){
				if(query){query+='^';}
				query += 'departmentNOT IN'+noDepartments;
			}
			if(locations){
				if(query){query+='^';}
				query += 'locationIN'+locations;
			}
			if(noLocations){
				if(query){query+='^';}
				query += 'locationNOT IN'+noLocations;
			}
			if(users){
				if(query){query+='^';}
				query += 'sys_idIN'+users;
			}
			if(noUsers){
				if(query){query+='^';}
				query += 'sys_idIN'+noUsers;
			}
			//filter out inactive users and those without names
			if(query){query+='^';}
			query += 'active=true^nameISNOTEMPTY';
			//Simple reference qualifier
			if(!roles && !groups && !noGroups){
				return query;
			}
			//Complex reference qualifier
			else{
				//Need to join to the group membership and role tables to return only those users with the correct groups/roles
				var userIDs = new GlideRecord('sys_user');
				userIDs.addEncodedQuery(query);
				if(groups || noGroups){
					var groupsGr = userIDs.addJoinQuery('sys_user_grmember','sys_id','user');
					if(groups){
						groupsGr.addCondition('group','IN',groups);
					}
					if(noGroups){
						groupsGr.addCondition('sys_id','NOT IN',noGroups);
					}
				}
				if(roles){
					var rolesGr = userIDs.addJoinQuery('sys_user_has_role','sys_id','user');
					rolesGr.addCondition('role','IN',roles);
				}
				var userIDQuery = '';
				userIDs.query();
				while(userIDs.next()){
					if(userIDQuery){userIDQuery += ',';}
					else{userIDQuery += 'sys_idIN';}
					userIDQuery += ''+userIDs.sys_id;
				}
				return userIDQuery;
			}
		}
		else return '';
	},
	
    type: 'EGPReturnCatalogItemUsers'
};