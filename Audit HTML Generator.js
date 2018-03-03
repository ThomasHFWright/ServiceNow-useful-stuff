var populateAuditImport = Class.create();
populateAuditImport.prototype = {
    initialize: function() {
    },
	
	//Enter tables to be audited
	//This will generate the sys_history_set records for each table and then use these generated records to create an HTML template of the history
	runAllLogic: function(generateHistorySets){
		this.runTableLogic('u_bai_contract',generateHistorySets);
		this.runTableLogic('u_bai_cntrct_tranche_pay',generateHistorySets);
		this.runTableLogic('u_bai_variations',generateHistorySets);
		this.runTableLogic('u_bai_contract_tranche_1',generateHistorySets);
		this.runTableLogic('u_bai_contract_tranche_2',generateHistorySets);
		this.runTableLogic('u_bai_contract_tranche_3',generateHistorySets);
		this.runTableLogic('u_bai_contract_tranche_4',generateHistorySets);
		this.runTableLogic('u_bai_contract_tranche_5',generateHistorySets);
	},
	
	runTableLogic: function(table,generateHistorySets){
		if(generateHistorySets){
			this.generateHistorySets(table);
			gs.log(table + ' history generated');
		}
		var gr = new GlideRecord(table);
		gr.query();
		while(gr.next()){
			gr.u_audit_import = this.generateHTMLForGR(gr);
			gr.setWorkflow(false);
			gr.autoSysFields(false);
			gr.update();
		}
		gs.log(table + ' history populated in to u_audit_import');
	},
	
	//Enter fields to be audited for each table below
	generateHTMLForGR: function(gr){
		if(gr.isValidRecord()){
			var fields = [];
			var comments = '';
			var table = ''+gr.getTableName();
			if(table == 'u_bai_contract'){
				fields.push('u_status');
				fields.push('u_t_s__c_s_accepted');
				fields.push('u_internal_review_notes');
				//fields.push('u_section_481_funding');
			}
			else if(table == 'u_bai_cntrct_tranche_pay'){
				fields.push('u_ratified');
			}
			else if(table == 'u_bai_variations'){
				fields.push('u_status');
				fields.push('u_grant_adjustment');
				fields.push('u_worknotes');
			}
			else if(table.indexOf('u_bai_contract_tranche_') != -1){
				fields.push('u_approved');
				fields.push('u_contractor_comments');
			}
			else return false;
			return this.createHistorySetHTML(gr.sys_id,fields);
			
		}
	},
	
	generateHistorySets: function(table){
		var gr = new GlideRecord(table);
		gr.query();
		while( gr.next() ){
			var histSet = new GlideHistorySet(table, gr.sys_id);
			histSet.refresh(); //<- will generate a new set if nothing exists, or update existing set if one found
			//histSet.generate() //<- will generate a new set, but not update existing sets
		}
	},
	
	createHistorySetHTML: function(recordID,fields){
		var histHTML = '';
		var set = new GlideRecord('sys_history_set');
		if(set.get('id',recordID)){
			var agg = new GlideAggregate('sys_history_line');
			agg.addQuery('set',set.sys_id);
			agg.addEncodedQuery('fieldIN'+fields.toString());
			agg.groupBy('update');
			agg.orderByDesc('update');
			agg.addAggregate('count','user');
			agg.addAggregate('count','update_time');
			agg.groupBy('user');
			agg.groupBy('update_time');
			agg.query();
			histHTML ='';
			while(agg.next()){
				histHTML+= '<p/>'
				var userInitals = '';
				try{
					userInitals = agg.user.first_name.slice(0,1) + agg.user.last_name.slice(0,1);
				}
				catch(e){}
				var userFullName = agg.user.name;
				var update_time = agg.update_time
				//var html1 = '<li ng-repeat="entry in entries" ng-if="isFormStream" form-stream-entry="" class="h-card h-card_md h-card_comments ng-scope" ng-animate="\'sn-animate-stream-entry\'" ng-click="controls.showRecord($event, entry, sysId)"><div ng-init="user_image = true"><div class="sn-card-component sn-card-component_first sn-card-component_meta sn-card-component_meta_sibling"><div class="sn-card-component-avatar sn-avatar_xs sn-avatar_v2 ng-isolate-scope" ng-if="::entry.sys_created_by != \'system\'" avatar-url="entry.user_image" initials="entry.initials" user-id="entry.user_id"><div sn-bootstrap-popover="::true" popover-wait-event="sn-user-profile.ready" role="button" class="sn-avatar-container"><span class="sn-avatar-initials ng-binding">';
				//var html2 = '</span></div></div><span ng-if="::entry.sys_created_by != \'system\'" class="sn-card-component-createdby ng-binding ng-scope">';
				//var html3 = '</span></div><div class="sn-card-component sn-card-component_first sn-card-component_meta"><span class="sn-card-component-time"><div class="date-calendar ng-binding">';
				//var html4 = '</div></span></div><div ng-if="entry.entries.custom.length > 0 || entry.entries.changes.length > 0" class="sn-card-component sn-card-component_records ng-scope"><div class="sn-widget"><ul class="sn-widget-list sn-widget-list-table">';
				
				histHTML +=  '[html1]'+ userInitals + '[html2]' + userFullName + '[html3]' + update_time + '[html4]';
				
				var hist = new GlideRecord('sys_history_line');
				hist.addQuery('set',set.sys_id);
				hist.addEncodedQuery('fieldIN'+fields.toString());
				hist.orderBy('label');
				hist.addQuery('update',agg.update);
				hist.query();
				while(hist.next()){
					histHTML+= this.createHTMLAuditLine(hist.label,hist['new'],hist.old);
				}
				
				//var htmlb = '</ul></div></div></div></li>'
				
				histHTML += '[htmlb]';
				
			}			
		}
		return histHTML;
	},
	
	createHTMLAuditLine: function(field_label, new_display_value, old_display_value){
		//var html5 = '<li ng-repeat="change in entry.entries.changes" class="ng-scope"><span class="sn-widget-list-table-cell" sn-bind-once="change.field_label">'
		//var html6 = '</span><span class="sn-widget-list-table-cell"><span ng-if="change.new_value" sn-bind-once="change.new_value" class="ng-scope">'
		var html = '[html5]' + field_label + '[html6]' + new_display_value + '</span>';
		
		//var html8 = '<span ng-if="change.old_value" class="sn-widget-list-table-italic ng-scope">was</span><span ng-if="change.old_value" sn-bind-once="change.old_value" class="ng-scope">'
		if(old_display_value){
			html += '[html8]'+old_display_value+'</span>';
		}
		//var htmla = '</span></li>'
		html += '[htmla]';
		return html;
	},
	
    type: 'populateAuditImport'
};